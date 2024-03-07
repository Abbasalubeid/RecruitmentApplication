import prisma from '$lib/server/prismaClient';
import Validator from '$lib/util/validator.js';

/**
 * Process POST requests for retrieving the role_id of a person from a migration token at '/api/auth/migration/role_id'.
 * Check if the provided migration token exists in the database. If it does not exist, an error is returned.
 * Otherwise, the persons role ID is returned.
 *
 * @param {Object} request - An object containing the migration token.
 * @returns {Response} - On success, return the role ID of the person; on failure, return an error message.
 */
export async function POST({ request }) {
	const data = await request.json();
	const { token } = data;

	if (!data || !data.token || !Validator.isString(data.token)) {
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
			return new Response(JSON.stringify({ role_id: user.role_id }), {
				status: 201,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		} else {
			return new Response(JSON.stringify({ error: 'Invalid token.' }), {
				status: 404,
				headers: { 'Content-Type': 'application/json' }
			});
		}
	} catch (error) {
		return new Response(JSON.stringify({ error: 'An error occured when checking the token.' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}
