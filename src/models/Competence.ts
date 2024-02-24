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
}
