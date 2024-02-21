/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CompetenceProfile } from './CompetenceProfile';

export class Competence {
	competence_id: number;
	name: string;
	competence_profile: CompetenceProfile[];

	/**
	 * Constructs a new Competence instance.
	 * @param competence_id The ID of the competence.
	 * @param name The name of the competence.
	 * @param competence_profile An array of competence profiles associated with this competence.
	 */
	constructor(competence_id: number, name: string, competence_profile: CompetenceProfile[]) {
		this.competence_id = competence_id;
		this.name = name;
		this.competence_profile = competence_profile;
	}
	/**
	 * Finds the competence in the given array based on the provided name.
	 *
	 * @param {Competence[]} competences - The array of competences to search within.
	 * @param {string} name - The name of the competence to search for.
	 * @returns {Competence | undefined} The competence found based on the provided name, or undefined if no match is found.
	 */
	public static getCompetenceByName(competences: Competence[], name: string) {
		const competence = competences.find((c) => c.name === name);
		return competence;
	}

	/**
	 * Finds the competence in the given array based on the provided competence profile.
	 *
	 * @param {any} competence_profile - The competence profile object to match against.
	 * @param {Competence[]} competences - The array of competences to search within.
	 * @returns {Competence | undefined} The competence found based on the provided competence profile, or undefined if no match is found.
	 */
	public static getCompetenceByCompetenceProfile(
		competence_profile: any,
		competences: Competence[]
	) {
		const competence = competences.find(
			(c) => c.competence_id === competence_profile.competence_id
		);
		return competence;
	}
}
