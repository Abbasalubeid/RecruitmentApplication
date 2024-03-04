import {Logger} from '$lib/server/logger';

/**
 * Handles GET requests to the /api/competence_profile endpoint.
 * Fetches all competence profiles from the database.
 *
 * @returns {Promise<Response>} Response object containing the competence profiles data in JSON format, or an error message.
 */
export async function POST({ request }) {
	try {
        const data = await request.json();
        const { errorMessage, logName } = data;
        Logger.logError(new Error(errorMessage), logName);

		return new Response(JSON.stringify({}), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Failed to write to log files' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
}