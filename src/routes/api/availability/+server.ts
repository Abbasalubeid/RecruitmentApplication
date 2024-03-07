import prisma from '$lib/server/prismaClient';

/**
 * Handles GET requests to the /api/availability endpoint.
 * Fetches all availability from the database.
 *
 * @returns {Promise<Response>} Response object containing the availability data in JSON format, or an error message.
 */
export async function GET() {
	try {
		const [availability] = await prisma.$transaction([prisma.availability.findMany({})]);

		return new Response(JSON.stringify({ availability }), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Failed to fetch availabilities' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
}
