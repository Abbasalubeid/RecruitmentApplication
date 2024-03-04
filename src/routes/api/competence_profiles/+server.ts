import prisma from '$lib/server/prismaClient';

/**
 * Handles GET requests to the /api/competence_profile endpoint.
 * Fetches all competence profiles from the database.
 *
 * @returns {Promise<Response>} Response object containing the competence profiles data in JSON format, or an error message.
 */
export async function GET() {
	try {
		    const competence_profile = await prisma.competence_profile.findMany({
		});

		return new Response(JSON.stringify({ competence_profile }), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		console.error('LOG: Failed to fetch competence profiles:', error);

		return new Response(JSON.stringify({ error: 'Failed to fetch competence profiles' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
}

/**
 * Handle PUT request to update competence profile
 * @param {Request} request Request object containing update data
 * @returns {Promise<Response>} Response containing updated competence profile ID or error message
 */
export async function PUT({ request }) {
    try {
        const data = await request.json();
        const { status, id } = data;

        const [updatedCompetenceProfile] = await prisma.$transaction ([
            prisma.competence_profile.update({
            where: { competence_profile_id: parseInt(id) },
            data: { status: status },
        })]);
		const updatedId = updatedCompetenceProfile.competence_profile_id;
        return new Response(JSON.stringify({ updatedId }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to update competence profile' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
