import prisma from '$lib/server/prismaClient';
import bcrypt from 'bcrypt';
import { BCRYPT_SALT_ROUNDS } from '$env/static/private';
import { Utilities } from '$lib/util/utilites';
import Validator from '$lib/util/validator';

/**
 * Processes POST requests for user registration at '/api/auth/signup'. It checks if the provided username or email
 * already exists in the database to prevent duplicates. If either is already in use, it returns a conflict error.
 * Otherwise, it creates a new user record with the provided details and returns the new user's information.
 *
 * @param {Object} request - Contains user registration details: name, surname, personal number (pnr), email, username, and password.
 * @returns {Response} - On success, returns new user information; on failure, returns an error message (e.g., "username/email already in use").
 */
export async function POST({ request }) {
	const data = await request.json();

	if (
		!data ||
		!data.name ||
		!data.surname ||
		!data.pnr ||
		!data.email ||
		!data.username ||
		!data.password ||
		!Validator.isString(data.name) ||
		!Validator.isString(data.surname) ||
		!Validator.isString(data.pnr) ||
		!Validator.isString(data.email) ||
		!Validator.isString(data.username) ||
		!Validator.isString(data.password)
	) {
		return new Response(JSON.stringify({ error: 'Invalid data format.' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const { name, surname, pnr, email, username, password } = data;

	if (Validator.isNameInvalid(name)) {
		return new Response(JSON.stringify({ error: 'Invalid name.' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	} else if (Validator.isNameInvalid(surname)) {
		return new Response(JSON.stringify({ error: 'Invalid surname.' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	} else if (Validator.isPnrInvalid(pnr)) {
		return new Response(JSON.stringify({ error: 'Invalid social security number format.' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	} else if (Validator.isEmailInvalid(email)) {
		return new Response(JSON.stringify({ error: 'Invalid email format.' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	} else if (Validator.isUsernameInvalid(username)) {
		return new Response(JSON.stringify({ error: 'Invalid username format.' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	} else if (Validator.isPasswordInvalid(password)) {
		return new Response(JSON.stringify({ error: 'Invalid password format.' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const saltRounds = parseInt(BCRYPT_SALT_ROUNDS);
	const hashedPassword = await bcrypt.hash(password, saltRounds);
	try {
		const [existingUser] = await prisma.$transaction([
			prisma.person.findFirst({
				where: {
					OR: [{ username }, { email }, { pnr }]
				}
			})
		]);

		if (existingUser) {
			let errorMessage;

			if (existingUser.pnr === pnr) {
				errorMessage = 'pnr is already in use';
			} else if (existingUser.email === email) {
				errorMessage = 'email is already in use';
			} else {
				errorMessage = 'username is already in use';
			}

			return new Response(JSON.stringify({ error: errorMessage }), {
				status: 409,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		const [newUser] = await prisma.$transaction([
			prisma.person.create({
				data: {
					name: Utilities.capitalizeFirstLetter(name),
					surname: Utilities.capitalizeFirstLetter(surname),
					pnr,
					email,
					username,
					password: hashedPassword,
					role_id: 2
				}
			})
		]);

		return new Response(
			JSON.stringify({
				newUser
			}),
			{
				status: 201,
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
	} catch (error) {
		return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}
