/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Role } from './Role';

/**
 * Represents an individual within the organization, encapsulating their personal details and role.
 */
export class Person {
	person_id: number;
	name: string;
	surname: string;
	email: string;
	role?: Role;
	username: string;

	/**
	 * Constructs a new Person instance.
	 * @param person_id - Unique identifier for the person.
	 * @param name - First name of the person.
	 * @param surname - Surname of the person.
	 * @param email - Email address of the person.
	 * @param username - Username for the person's account.
	 * @param role - Role of the person within the organization (optional).
	 */
	constructor(
		person_id: number,
		name: string,
		surname: string,
		email: string,
		username: string,
		role?: Role
	) {
		this.person_id = person_id;
		this.name = name;
		this.surname = surname;
		this.email = email;
		this.username = username;
		this.role = role;
	}

	/**
	 * Returns the full name of the person by concatenating the first name and surname.
	 * @returns Full name of the person.
	 */
	getFullName(): string {
		return `${this.name} ${this.surname}`;
	}
}
