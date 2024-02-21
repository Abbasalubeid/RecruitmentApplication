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
	role: Role;
	username: string;

	/**
	 * Constructs a new Person instance.
	 * @param person_id - Unique identifier for the person.
	 * @param name - First name of the person.
	 * @param surname - Surname of the person.
	 * @param email - Email address of the person.
	 * @param role - Role of the person within the organization.
	 * @param username - Username for the person's account.
	 */
	constructor(
		person_id: number,
		name: string,
		surname: string,
		email: string,
		role: Role,
		username: string
	) {
		this.person_id = person_id;
		this.name = name;
		this.surname = surname;
		this.email = email;
    this.role = role;
		this.username = username;
	}

	public static getFirstPersonByFullname(firstName: string, surname: string, persons: Person[]) {
		const person = persons.find(
			(p) =>
				p.name === firstName &&
				p.surname === surname
		);
		return person;
	}
	public static getPersonByCompetenceProfile(competence_profile: any, persons: Person[]) {
		const person = persons.find((p) => p.person_id === competence_profile.person_id);
		return person;
	}

	public static getPersonsContainingName(name: string, persons: Person[]) {
		const possible_persons = persons.filter(
			(p) =>
			p.name.includes(name) ||
			p.surname.includes(name)
		);
		return possible_persons;
	}

	/**
	 * Returns the full name of the person by concatenating the first name and surname.
	 * @returns Full name of the person.
	 */
	getFullName(): string {
		return `${this.name} ${this.surname}`;
	}
}
