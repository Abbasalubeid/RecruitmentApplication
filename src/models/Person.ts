/* eslint-disable @typescript-eslint/no-explicit-any */
export class Person {
	person_id: number;
	name: string;
	surname: string;
	email: string;
	role_id: number;
	username: string;

	/**
     * Constructs a new Person object.
     * @param {number} person_id - The unique identifier for the person.
     * @param {string} name - The person's first name.
     * @param {string} surname - The person's last name.
     * @param {string} email - The person's email address.
     * @param {number} role_id - The role ID associated with the person.
     * @param {string} username - The person's username.
     */
	constructor(
		person_id: number,
		name: string,
		surname: string,
		email: string,
		role_id: number,
		username: string
	) {
		this.person_id = person_id;
		this.name = name;
		this.surname = surname;
		this.email = email;
		this.role_id = role_id;
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
}