/**
 * Server-side load function for root layout.
 * Returns user data to client-side based on server-side authentication.
 *
 * @param {Object} context - Server-side context, including `locals` with user data.
 * @returns {Object} User data for client-side synchronization.
 */
export async function load({ locals }) {
	return { user: locals.user ? locals.user.toJSON() : null };
}
