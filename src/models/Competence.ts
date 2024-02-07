import type { CompetenceProfile } from './CompetenceProfile';

export class Competence {
	competence_id: number;
	name: string;
	competence_profile: CompetenceProfile[];

	constructor(competence_id: number, name: string, competence_profile: CompetenceProfile[]) {
		this.competence_id = competence_id;
		this.name = name;
		this.competence_profile = competence_profile;
	}
}
