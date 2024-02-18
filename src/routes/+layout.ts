import { addMessages, init, getLocaleFromNavigator } from 'svelte-i18n';
import { locales } from '$lib/locales/localeConfig';

/**
 * Load function for the root layout module.
 * Initializes the svelte-i18n library with locale messages imported from 'localeConfig.ts'.
 * Sets the initial locale based on the 'lang' query parameter or defaults to the navigator language or 'en'.
 *
 * @async
 * @function load
 * @param {Object} params - The load parameters provided by SvelteKit, including URL.
 * @returns {Promise<Object>} An empty object, as the load function must return an object.
 */
export async function load({ url }): Promise<object> {
	Object.entries(locales).forEach(([locale, messages]) => {
		addMessages(locale, messages);
	});

	const initialLocale = url.searchParams.get('lang') || getLocaleFromNavigator() || 'en';

	await init({
		fallbackLocale: 'en',
		initialLocale: initialLocale
	});

	return {};
}
