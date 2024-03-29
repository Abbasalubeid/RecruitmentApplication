/**
 * Defines metadata for application routes, specifying access control rules and behaviors.
 * This configuration allows for granular control over who can access specific routes based
 * on authentication status and user roles. It also specifies custom behaviors, such as
 * redirecting authenticated users away from certain routes.
 *
 * - `public`: Indicates that a route can be accessed without authentication.
 * - `requiresAuth`: Indicates that a route requires the user to be authenticated.
 * - `roles`: An array of roles allowed to access the route. Used with `requiresAuth`.
 * - `redirectIfAuthenticated`: Specifies a path to redirect authenticated users to.
 */

interface RouteMeta {
	public?: boolean;
	redirectIfAuthenticated?: string;
	requiresAuth?: boolean;
	roles?: string[];
}

interface RouteMetadata {
	[key: string]: RouteMeta;
}

export const routeMetadata: RouteMetadata = {
	'/': { public: true },
	'/login': { redirectIfAuthenticated: '/' },
	'/signup': { redirectIfAuthenticated: '/' },
	'/applications': { requiresAuth: true, roles: ['recruiter'] },
	'/apply': { requiresAuth: true, roles: ['applicant'] }
};
