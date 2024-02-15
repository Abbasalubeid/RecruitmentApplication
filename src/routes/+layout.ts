import { addMessages, init } from 'svelte-i18n';
import { locales } from '$lib/locales/localeConfig';

/**
 * Load function for the root layout module.
 * Initializes the svelte-i18n library with locale messages imported from 'localeConfig.ts'.
 * Ensures internationalization is ready before rendering the application content.
 *
 * @async
 * @function load
 * @returns {Promise<Object>} An empty object, as the load function must return an object.
 */
export async function load(): Promise<object> {
	Object.entries(locales).forEach(([locale, messages]) => {
		addMessages(locale, messages);
	});

	await init({
		fallbackLocale: 'en',
		initialLocale: 'en'
	});

	return {};
}
