import { JWT_SECRET } from '$env/static/private';
import prisma from '$lib/server/prismaClient';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

/**
 * Handles POST requests to the '/api/auth/login' endpoint for user authentication.
 * It verifies the provided username and password against the database, generates a JWT token upon successful authentication,
 * and sets it in an HTTP-only cookie. Returns a response containing the authenticated user's information or an error message.
 *
 * @param {Object} request - The incoming request object, containing the username and password in its body.
 * @param {Object} cookies - The cookies utility for setting the authentication token in the response.
 * @returns {Response} - A response object with the user's information or an error message.
 */
export async function POST({ request, cookies }) {
	const data = await request.json();
	const { username, password } = data;

	let user;
	try {
		[user] = await prisma.$transaction([
			prisma.person.findFirst({
				where: { username },
				include: { role: true }
			})
		]);

		if (user && user.password) {
			const correctPassword = await bcrypt.compare(password, user.password);
			if (correctPassword) {
				const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });

				cookies.set('token', token, {
					path: '/',
					httpOnly: true,
					secure: false,
					sameSite: 'strict',
					maxAge: 60 * 60
				});

				return new Response(
					JSON.stringify({
						userInfo: {
							person_id: user.person_id,
							name: user.name,
							surname: user.surname,
							email: user.email,
							role: user.role,
							username: user.username
						}
					}),
					{
						status: 200,
						headers: { 'Content-Type': 'application/json' }
					}
				);
			}
		}
	} catch (error) {
		return new Response(JSON.stringify({ error: 'An error occurred during the login process' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	return new Response(JSON.stringify({ error: 'Invalid username or password' }), {
		status: 401,
		headers: { 'Content-Type': 'application/json' }
	});
}
