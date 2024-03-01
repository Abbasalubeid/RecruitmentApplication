// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import { Person } from './models/Person';
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: Person | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
