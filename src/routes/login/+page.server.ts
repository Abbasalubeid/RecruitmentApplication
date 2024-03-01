/**
 * Server-side load function for the login page. Retrieves the originally requested path
 * from cookies to redirect the user back after a successful login. This path is saved
 * when unauthenticated users attempt to access protected routes.
 *
 * After retrieving the originally requested path, the 'org-path' cookie is deleted
 * to clean up and prevent unintended redirects in the future.
 *
 * @param {Object} context - The load context provided by SvelteKit, including cookies.
 * @returns {Object} - An object containing props to be passed to the page component.
 */
export async function load({ cookies }) {
	const requestedPath = cookies.get('org-path') || '/';

	cookies.delete('org-path', { path: '/' });

	return {
		props: {
			requestedPath
		}
	};
}
