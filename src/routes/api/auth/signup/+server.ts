import prisma from '$lib/server/prismaClient';

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
	const { name, surname, pnr, email, username, password } = data;

	try {
		const existingUser = await prisma.person.findFirst({
			where: {
				OR: [{ username }, { email }]
			}
		});

		if (existingUser) {
			const isUsernameTaken = existingUser.username === username;
			const isEmailTaken = existingUser.email === email;

			let errorMessage = 'User already exists';
			if (isUsernameTaken && isEmailTaken) {
				errorMessage = 'Both username and email are already in use';
			} else if (isUsernameTaken) {
				errorMessage = 'username is already in use';
			} else if (isEmailTaken) {
				errorMessage = 'email is already in use';
			}

			return new Response(JSON.stringify({ error: errorMessage }), {
				status: 409,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		const newUser = await prisma.person.create({
			data: {
				name,
				surname,
				pnr,
				email,
				username,
				password,
				role_id: 2
			}
		});

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
