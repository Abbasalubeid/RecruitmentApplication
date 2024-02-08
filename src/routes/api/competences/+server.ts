import prisma from '$lib/server/prismaClient';

/**
 * Handles GET requests to the /api/competences endpoint.
 * Fetches all competences from the database, including their related competence profiles.
 *
 * @returns A Response object containing the competences data in JSON format, or an error message.
 */
export async function GET() {
	try {
		const competences = await prisma.competence.findMany({
			include: {
				competence_profile: true // Include related competence profiles in the response
			}
		});

		// Return a 200 OK response with the competences data
		return new Response(JSON.stringify({ competences }), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		console.error('LOG: Failed to fetch competences:', error);

		// Return a 500 Internal Server Error response in case of a failure
		return new Response(JSON.stringify({ error: 'Failed to fetch competences' }), {
			status: 500, // Internal Server Error
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
}
