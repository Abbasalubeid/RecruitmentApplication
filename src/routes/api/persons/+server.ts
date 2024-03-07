import prisma from '$lib/server/prismaClient';

/**
 * Handles GET requests to the /api/persons endpoint.
 * Fetches all persons from the database.
 *
 * @returns {Promise<Response>} Response object containing the persons data in JSON format, or an error message.
 */
export async function GET() {
	try {
		const [person] = await prisma.$transaction([prisma.person.findMany({})]);

		return new Response(JSON.stringify({ person }), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Failed to fetch persons' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
}
