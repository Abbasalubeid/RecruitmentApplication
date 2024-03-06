import prisma from '$lib/server/prismaClient';

/**
 * Retrieves a list of competences.
 * @returns {Promise<Response>} A Promise that resolves to a Response object containing the list of competences.
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

/**
 * Handles the PUT request for updating an application.
 * @param {Object} request - The request object.
 * @returns {Response} - The response object.
 */
export async function PUT({ request }) {
	try {
		const data = await request.json();
		const { person_id, experiences, availabilities } = data;

		typeof availabilities[0].from_date;
		await prisma.$transaction(async (prisma) => {
			await prisma.availability.createMany({
				data: availabilities.map((availability: { startDay: string; endDay: string }) => ({
					person_id: person_id,
					from_date: availability.startDay,
					to_date: availability.endDay
				}))
			});

			await prisma.competence_profile.createMany({
				data: experiences.map(
					(experience: { expertise: Array<[number, string]>; years: number }) => ({
						person_id: person_id,
						competence_id: experience.expertise[0],
						years_of_experience: experience.years
					})
				)
			});
		});

		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		console.error('LOG: Failed to update application:', error);

		return new Response(JSON.stringify({ error: 'Failed to update application' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
}
