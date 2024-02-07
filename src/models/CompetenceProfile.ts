export class CompetenceProfile {
	competence_profile_id: number;
	person_id: number;
	competence_id: number;
	years_of_experience: number;

	constructor(
		competence_profile_id: number,
		person_id: number,
		competence_id: number,
		years_of_experience: number
	) {
		this.competence_profile_id = competence_profile_id;
		this.person_id = person_id;
		this.competence_id = competence_id;
		this.years_of_experience = years_of_experience;
	}
}
