/* eslint-disable @typescript-eslint/no-explicit-any */
import { JWT_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';
import prisma from '$lib/server/prismaClient';

/**
 * Handles GET requests to the '/api/auth/me' endpoint, designed to return the current authenticated user's information.
 * It validates the JWT token from the request cookies, fetches the user's details from the database based on the token's username claim,
 * and returns the user's information. It responds with an error if the token is invalid, expired, or if the user is not found.
 *
 * @param {Object} cookies - The cookies utility for accessing the authentication token sent by the client.
 * @returns {Response} - A response object with the current user's information or an error message.
 */
export async function GET({ cookies }) {
	const token = cookies.get('token');

	if (!token) {
		return new Response(JSON.stringify({ error: 'No token provided' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		const username = (decoded as any).username;

		const user = await prisma.person.findFirst({
			where: { username },
			include: { role: true }
		});

		if (!user) {
			return new Response(JSON.stringify({ error: 'User not found' }), {
				status: 404,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		return new Response(
			JSON.stringify({
				person_id: user.person_id,
				name: user.name,
				surname: user.surname,
				email: user.email,
				role: user.role,
				username: user.username
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			}
		);
	} catch (err) {
		return new Response(JSON.stringify({ error: 'Invalid or expired token' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}
