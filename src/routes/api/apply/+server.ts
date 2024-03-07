import prisma from '$lib/server/prismaClient';
import Validator from '$lib/util/validator.js';

/**
 * Retrieves a list of competences.
 * @returns {Promise<Response>} A Promise that resolves to a Response object containing the list of competences.
 */
export async function GET() {
	try {
		const [competences] = await prisma.$transaction([prisma.competence.findMany()]);
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

		if (!data) {
			return new Response(JSON.stringify({ error: 'Invalid data format.' }), {
				status: 400,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}

		if (!data.person_id || !Validator.isIntegerWithMaxSize(data.person_id, 4)) {
			return new Response(JSON.stringify({ error: 'Invalid data format.' }), {
				status: 400,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}

		if (!data.experiences || !Array.isArray(data.experiences)) {
			return new Response(JSON.stringify({ error: 'Invalid data format.' }), {
				status: 400,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}

		for (let index = 0; index < data.experiences.length; index++) {
			const experience = data.experiences[index];
			if (
				!experience.expertise[0] ||
				!experience.expertise[1] ||
				!Validator.isIntegerWithMaxSize(experience.expertise[0], 4) ||
				!Validator.isString(experience.expertise[1]) ||
				!experience.years ||
				!(experience.years < 99 && experience.years > 0)
			) {
				return new Response(JSON.stringify({ error: 'Invalid data format.' }), {
					status: 400,
					headers: {
						'Content-Type': 'application/json'
					}
				});
			}
		}

		if (!data.availabilities || !Array.isArray(data.availabilities)) {
			return new Response(JSON.stringify({ error: 'Invalid data format.' }), {
				status: 400,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}

		for (let index = 0; index < data.availabilities.length; index++) {
			const availability = data.availabilities[index];
			if (
				!availability.startDay ||
				!availability.endDay ||
				!Validator.isString(availability.startDay) ||
				!Validator.isString(availability.endDay) ||
				Validator.isDateRangeInvalid(availability.startDay, availability.endDay)
			) {
				return new Response(JSON.stringify({ error: 'Invalid data format.' }), {
					status: 400,
					headers: {
						'Content-Type': 'application/json'
					}
				});
			}
		}

		const { person_id, experiences, availabilities } = data;

		await prisma.$transaction(async (prisma) => {
			if (availabilities) {
				await prisma.availability.createMany({
					data: availabilities.map((availability: { startDay: string; endDay: string }) => ({
						person_id: person_id,
						from_date: availability.startDay,
						to_date: availability.endDay
					}))
				});
			}

			if (experiences) {
				await prisma.competence_profile.createMany({
					data: experiences.map(
						(experience: { expertise: Array<[number, string]>; years: number }) => ({
							person_id: person_id,
							competence_id: experience.expertise[0],
							years_of_experience: experience.years
						})
					)
				});
			}
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
