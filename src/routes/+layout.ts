import { addMessages, init, getLocaleFromNavigator } from 'svelte-i18n';
import { locales } from '$lib/locales/localeConfig';
import { Person } from '../models/Person';
import { userStore } from '$lib/stores/userStore';

/**
 * Load function for the root layout module.
 * Initializes i18n and updates client-side user store.
 * Sets app's initial locale and syncs userStore with server-side user data.
 *
 * @param {Object} params - The load parameters provided by SvelteKit.
 */
export async function load({ url, data }) {
	Object.entries(locales).forEach(([locale, messages]) => {
		addMessages(locale, messages);
	});

	const initialLocale = url.searchParams.get('lang') || getLocaleFromNavigator() || 'en';

	await init({
		fallbackLocale: 'en',
		initialLocale: initialLocale
	});

	if (data.user) {
		const { user } = data;
		const person = new Person(
			user.person_id,
			user.name,
			user.surname,
			user.email,
			user.username,
			user.role
		);
		userStore.updateUser(person);
	} else {
		userStore.clearUser();
	}
}
