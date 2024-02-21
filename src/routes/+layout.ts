import { addMessages, init, getLocaleFromNavigator } from 'svelte-i18n';
import { locales } from '$lib/locales/localeConfig';
import { userStore } from '$lib/stores/UserStore';
import { Person } from '../models/Person';

/**
 * Load function for the root layout module. This function performs two primary tasks:
 * 1. Initializes the svelte-i18n library with locale messages imported from 'localeConfig.ts'.
 *    Sets the initial locale based on the 'lang' query parameter or defaults to the navigator language or 'en'.
 * 2. Fetches the current user data from the '/api/auth/me' endpoint and updates the userStore with this data.
 * This ensures that user data is always available in the store for access across different pages.
 *
 * @async
 * @function load
 * @param {Object} params - The load parameters provided by SvelteKit, including fetch function and URL.
 * @returns {Promise<Object>} An empty object, as the load function must return an object.
 */
export async function load({ url, fetch }): Promise<object> {
	Object.entries(locales).forEach(([locale, messages]) => {
		addMessages(locale, messages);
	});

	const initialLocale = url.searchParams.get('lang') || getLocaleFromNavigator() || 'en';

	await init({
		fallbackLocale: 'en',
		initialLocale: initialLocale
	});

	const response = await fetch('/api/auth/me');
	if (response.ok) {
		const userInfo = await response.json();
		const user = new Person(
			userInfo.person_id,
			userInfo.name,
			userInfo.surname,
			userInfo.email,
			userInfo.role,
			userInfo.username
		);
		userStore.updateUser(user);
	}

	return {};
}
