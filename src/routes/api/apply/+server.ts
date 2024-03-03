import prisma from '$lib/server/prismaClient';

/**
 * Handles GET requests to the /api/apply endpoint.
 * Fetches all available competences from the database.
 *
 * @returns A Response object containing the competences data in JSON format, or an error message.
 */
export async function GET() {
	try {
		const competences = await prisma.competence.findMany();

		return new Response(JSON.stringify({ competences }), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		console.error('LOG: Failed to fetch competences:', error);

		return new Response(JSON.stringify({ error: 'Failed to fetch competences' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
}
