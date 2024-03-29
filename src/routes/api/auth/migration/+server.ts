import prisma from '$lib/server/prismaClient';
import bcrypt from 'bcrypt';
import { BCRYPT_SALT_ROUNDS } from '$env/static/private';
import Validator from '$lib/util/validator.js';

//TODO: Fix errors.

/**
 * Process POST requests for updating user data at '/api/auth/migration'. Check if the provided social security number and email or username
 * already exists in the database to prevent duplicates. If any is already in use, a conflict error is returned.
 * Otherwise, the user record is updated with the provided details.
 *
 * @param {Object} request - Contains user details: socail security number (pnr) and email or username and password.
 * @returns {Response} - On success, returns nothing; on failure, returns an error message.
 */
export async function POST({ request }) {
	const data = await request.json();
	const { token, formData } = data;

	if (!data || !data.token || !data.formData || !Validator.isString(data.token)) {
		return new Response(JSON.stringify({ error: 'Invalid data format.' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	if (Validator.isTokenInvalid(token)) {
		return new Response(JSON.stringify({ error: 'Invalid token format.' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	try {
		const [user] = await prisma.$transaction([
			prisma.person.findFirst({
				where: {
					migration_token: {
						token: token
					}
				}
			})
		]);

		if (user) {
			return await updateUser(user, formData);
		} else {
			return new Response(JSON.stringify({ error: 'Invalid token.' }), {
				status: 404,
				headers: { 'Content-Type': 'application/json' }
			});
		}
	} catch (error) {
		return new Response(JSON.stringify({ error: 'An error occured.' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async function updateUser(user: any, missingData: any) {
		if (user.role_id == 1) {
			if (
				!missingData.pnr ||
				!missingData.email ||
				!Validator.isString(missingData.pnr) ||
				!Validator.isString(missingData.email)
			) {
				return new Response(JSON.stringify({ error: 'Invalid data format.' }), {
					status: 400,
					headers: { 'Content-Type': 'application/json' }
				});
			}

			if (Validator.isPnrInvalid(missingData.pnr)) {
				return new Response(JSON.stringify({ error: 'Invalid social security number format.' }), {
					status: 400,
					headers: { 'Content-Type': 'application/json' }
				});
			} else if (Validator.isEmailInvalid(missingData.email)) {
				return new Response(JSON.stringify({ error: 'Invalid email format.' }), {
					status: 400,
					headers: { 'Content-Type': 'application/json' }
				});
			}

			const [existingUser] = await prisma.$transaction([
				prisma.person.findFirst({
					where: {
						OR: [{ pnr: missingData.pnr }, { email: missingData.email }]
					}
				})
			]);

			if (existingUser) {
				let error;
				if (existingUser.pnr === missingData.pnr) {
					error = 'Social Security Number is already in use.';
				} else {
					error = 'Email is already in use.';
				}

				return new Response(JSON.stringify({ error: error }), {
					status: 409,
					headers: { 'Content-Type': 'application/json' }
				});
			}

			await prisma.$transaction(async (prisma) => {
				const updatedPerson = await prisma.person.update({
					where: {
						person_id: user.person_id
					},
					data: {
						pnr: missingData.pnr,
						email: missingData.email
					}
				});

				await prisma.migration_token.delete({
					where: {
						person_id: updatedPerson.person_id
					}
				});
			});

			return new Response('success', {
				status: 201,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		} else {
			if (
				!missingData.username ||
				!missingData.password ||
				!Validator.isString(missingData.username) ||
				!Validator.isString(missingData.password)
			) {
				return new Response(JSON.stringify({ error: 'Invalid data format.' }), {
					status: 400,
					headers: { 'Content-Type': 'application/json' }
				});
			}

			if (Validator.isUsernameInvalid(missingData.username)) {
				return new Response(JSON.stringify({ error: 'Invalid username format.' }), {
					status: 400,
					headers: { 'Content-Type': 'application/json' }
				});
			} else if (Validator.isPasswordInvalid(missingData.password)) {
				return new Response(JSON.stringify({ error: 'Invalid password format.' }), {
					status: 400,
					headers: { 'Content-Type': 'application/json' }
				});
			}

			const [existingUser] = await prisma.$transaction([
				prisma.person.findFirst({
					where: {
						username: missingData.username
					}
				})
			]);

			if (existingUser) {
				const error = 'Username is already in use.';

				return new Response(JSON.stringify({ error: error }), {
					status: 409,
					headers: { 'Content-Type': 'application/json' }
				});
			}

			const saltRounds = parseInt(BCRYPT_SALT_ROUNDS);
			const hashedPassword = await bcrypt.hash(missingData.password, saltRounds);

			await prisma.$transaction(async (prisma) => {
				const updatedPerson = await prisma.person.update({
					where: {
						person_id: user.person_id
					},
					data: {
						username: missingData.username,
						password: hashedPassword
					}
				});

				await prisma.migration_token.delete({
					where: {
						person_id: updatedPerson.person_id
					}
				});
			});

			return new Response('success', {
				status: 201,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}
	}
}
