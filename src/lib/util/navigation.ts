import { goto } from '$app/navigation';

/**
 * Navigates to a specified path while preserving the 'lang' query parameter from the current URL.
 *
 * This function extracts the 'lang' parameter from the current window's URL and appends it to the
 * target path. If the 'lang' parameter is not present in the current URL, it navigates to the path
 * without any query parameters.
 *
 * @param {string} path - The target path to navigate to. This should be a relative path starting with '/'.
 */

export function navigateWithQuery(path: string) {
	const queryParams = new URLSearchParams(window.location.search);
	const lang = queryParams.get('lang');
	goto(`${path}?${lang ? `lang=${lang}` : ''}`);
}
