// src/hooks.server.ts
import { redirectWithQuery } from '$lib/util/navigation';
import { authenticateUser } from '$lib/server/authenticateUser';
import { routeMetadata } from '$lib/metadata/routeMeta';

/**
 * Global server hook for managing authentication, authorization, and custom redirection logic
 * based on the user's authentication status and predefined route metadata.
 *
 * This hook intercepts every page request and applies logic defined in `routeMetadata` to
 * determine the appropriate action, such as allowing access, denying access, or redirecting
 * the user based on their authentication status and role.
 *
 * @param {Object} event - Contains request details such as URL and cookies, provided by SvelteKit.
 * @param {Function} resolve - Function to continue resolving the request, leading to page rendering or API response.
 * @returns {Promise} - Resolves the event, potentially modifying the response based on authentication and authorization logic.
 */
export async function handle({ event, resolve }) {
	const userData = await authenticateUser(event.cookies.get('token'));

	event.locals.user = userData;

	const { pathname, search } = event.url;
	const routeMeta = routeMetadata[pathname];

	if (routeMeta?.public) {
		return await resolve(event);
	}

	// If the route specifies a redirection for authenticated users, apply it.
	if (userData && routeMeta?.redirectIfAuthenticated) {
		redirectWithQuery(search, routeMeta.redirectIfAuthenticated);
	}

	// For routes requiring authentication, redirect unauthenticated users to the login page.
	if (!userData && routeMeta?.requiresAuth) {
		event.cookies.set('org-path', pathname, { path: '/', httpOnly: true, sameSite: 'strict' });
		redirectWithQuery(search, '/login');
	}

	// For routes specifying required roles, check the authenticated user's role.
	if (userData && routeMeta?.roles && !routeMeta.roles.includes(userData.role)) {
		redirectWithQuery(search, '/unauthorized');
	}

	// If none of the above conditions apply, proceed with resolving the request normally.
	return await resolve(event);
}
