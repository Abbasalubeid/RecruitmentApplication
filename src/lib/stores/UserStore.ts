import { writable } from 'svelte/store';
import type { Person } from '../../models/Person';

/**
 * A Svelte store that holds the current user's information as a Person model.
 */
const createUserStore = () => {
	const { subscribe, set } = writable<Person | null>(null);

	return {
		subscribe,
		/**
		 * Updates the current user's information in the store.
		 * @param person - The Person instance to set as the current user.
		 */
		updateUser: (person: Person) => set(person),

		/**
		 * Clears the current user's information from the store, effectively logging them out.
		 */
		clearUser: () => set(null)
	};
};

export const userStore = createUserStore();
