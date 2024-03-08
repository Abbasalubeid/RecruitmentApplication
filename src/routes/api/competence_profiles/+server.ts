import prisma from '$lib/server/prismaClient';
import Validator from '$lib/util/validator.js';

/**
 * Handles GET requests to the /api/competence_profile endpoint.
 * Fetches all competence profiles from the database.
 *
 * @returns {Promise<Response>} Response object containing the competence profiles data in JSON format, or an error message.
 */
export async function GET() {
	try {
		const [competence_profile] = await prisma.$transaction([
			prisma.competence_profile.findMany({})
		]);

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

		if (
			!data ||
			!data.status ||
			!data.id ||
			!data.version ||
			!Validator.isString(data.status) ||
			!Validator.isString(data.id) ||
			!Validator.isIntegerWithMaxSize(parseInt(data.version), 4) ||
			!Validator.isIntegerWithMaxSize(parseInt(data.id), 4)
		) {
			return new Response(JSON.stringify({ error: 'Invalid data format.' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		const { status, id, version } = data;

		const [existingCompetenceProfile] = await prisma.$transaction ([prisma.competence_profile.findUnique({
			where: { competence_profile_id: parseInt(id) }
			})
		]);

		if (existingCompetenceProfile && existingCompetenceProfile.version === version) {
			const [updatedCompetenceProfile] = await prisma.$transaction([
				prisma.competence_profile.update({
					where: { competence_profile_id: parseInt(id) },
					data: { status: status, version: version + 1 }
				})
			]);
			const updatedId = updatedCompetenceProfile.competence_profile_id;
			return new Response(JSON.stringify({ updatedId }), {
				status: 200,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		} else {
			return new Response(JSON.stringify({ error: 'Not the same version' }), {
				status: 520,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Failed to update competence profile' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
}
