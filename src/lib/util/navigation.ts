import { goto } from '$app/navigation';
import { redirect } from '@sveltejs/kit';

/**
 * Navigates to a specified path while preserving the 'lang' query parameter from the current URL, with an option to force a full page reload.
 *
 * This function constructs the target URL by appending the 'lang' query parameter from the current URL, if present.
 * It then navigates to this constructed URL, either by using SvelteKit's `goto` function for client-side navigation
 * or by setting `window.location.href` to force a full page reload, based on the `forceReload` parameter.
 *
 * @param {string} path - The target path to navigate to, which should be a relative path starting with '/'.
 * @param {boolean} [forceReload=false] - If set to true, forces a full page reload after navigation.
 */

export function navigateWithQuery(path: string, forceReload = false) {
	const queryParams = new URLSearchParams(window.location.search);
	const lang = queryParams.get('lang');
	const hasExistingQuery = path.includes('?');

	const additionalQueryString = lang ? `${hasExistingQuery ? '&' : '?'}lang=${lang}` : '';

	const fullPath = `${path}${additionalQueryString}`;

	if (forceReload) {
		window.location.href = fullPath;
	} else {
		goto(fullPath);
	}
}

/**
 * Redirects to a specified path on the server side while preserving the 'lang' query parameter.
 *
 * This function is designed for server-side usage where the `window` object is not available. It
 * extracts the 'lang' parameter from the provided query string and appends it to the target path.
 * If the 'lang' parameter is not present in the query string, it redirects to the path without any
 * query parameters. This ensures that the language preference is maintained across redirects.
 *
 * @param {string} query - The query string from the current URL, used to extract the 'lang' parameter.
 * @param {string} path - The target path to redirect to. This should be a relative path starting with '/'.
 */
export function redirectWithQuery(query: string, path: string) {
	const queryParams = new URLSearchParams(query);
	const lang = queryParams.get('lang');
	const queryString = lang ? `lang=${lang}` : '';

	const fullPath = queryString ? `${path}?${queryString}` : path;

	redirect(303, fullPath);
}
