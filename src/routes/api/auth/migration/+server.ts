import prisma from '$lib/server/prismaClient';

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

	try {
		const user = await prisma.person.findFirst({
			where: {
				migration_token: {
					token: token
				}
			}
		});

		if (user) {
			return await updateUser(user, formData);
		} else {
			return new Response(JSON.stringify({ error: 'error.invalidToken' }), {
				status: 404,
				headers: { 'Content-Type': 'application/json' }
			});
		}
	} catch (error) {
		return new Response(JSON.stringify({ error: 'error.unexpected' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async function updateUser(user: any, missingData: any) {
		if (user.role_id == 1) {
			const existingUser = await prisma.person.findFirst({
				where: {
					OR: [{ pnr: missingData.pnr }, { email: missingData.email }]
				}
			});

			if (existingUser) {
				let errorKey;
				if (existingUser.pnr === missingData.pnr) {
					errorKey = 'error.pnrInUse';
				} else {
					errorKey = 'error.emailInUse';
				}

				return new Response(JSON.stringify({ error: errorKey }), {
					status: 409,
					headers: { 'Content-Type': 'application/json' }
				});
			}

			await prisma.person.update({
				where: {
					person_id: user.person_id
				},
				data: {
					pnr: missingData.pnr,
					email: missingData.email
				}
			});

			// await prisma.migration_token.delete({
			// 	where: {
			// 		person_id: updatedPerson.person_id
			// 	}
			// });

			return new Response('success', {
				status: 201,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		} else {
			const existingUser = await prisma.person.findFirst({
				where: {
					username: missingData.username
				}
			});

			if (existingUser) {
				const errorKey = 'error.usernameInUse';

				return new Response(JSON.stringify({ error: errorKey }), {
					status: 409,
					headers: { 'Content-Type': 'application/json' }
				});
			}

			await prisma.person.update({
				where: {
					person_id: user.person_id
				},
				data: {
					username: missingData.username,
					password: missingData.password
				}
			});

			// await prisma.migration_token.delete({
			// 	where: {
			// 		person_id: updatedPerson.person_id
			// 	}
			// });

			return new Response('success', {
				status: 201,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}
	}
}