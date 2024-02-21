/* eslint-disable @typescript-eslint/no-explicit-any */

export class CompetenceProfile {
	competence_profile_id: number;
	person_id: number;
	competence_id: number;
	years_of_experience: number;
	status: string;

	/**
	 * Constructs a new CompetenceProfile instance.
	 * @param competence_profile_id The ID of the competence profile.
	 * @param person_id The ID of the person associated with this competence profile.
	 * @param competence_id The ID of the competence associated with this profile.
	 * @param years_of_experience The years of experience in this competence profile.
	 * @param status The current status of this competence profile.
	 */
	constructor(
		competence_profile_id: number,
		person_id: number,
		competence_id: number,
		years_of_experience: number,
		status: string
	) {
		this.competence_profile_id = competence_profile_id;
		this.person_id = person_id;
		this.competence_id = competence_id;
		this.years_of_experience = years_of_experience;
		this.status = status;
	}

	/**
	 * Formats the years of experience into a more readable string.
	 * @returns A string representation of the years of experience, in years and months.
	 */
	formatYearsOfExperience(): string {
		const years = Math.floor(this.years_of_experience);
		const months = Math.round((this.years_of_experience - years) * 12);
		let formatted = years > 0 ? `${years} year${years > 1 ? 's' : ''}` : '';
		if (months > 0) {
			formatted += `${formatted ? ' and ' : ''}${months} month${months > 1 ? 's' : ''}`;
		}
		return formatted || 'Less than a month';
	}

	public static getCompetenceProfileByPersonAndCompetence(competence: any, person: any, competence_profiles: CompetenceProfile[]) {
		const competence_profile = competence_profiles.find(
			(cp) => cp.competence_id === competence.competence_id && cp.person_id === person.person_id
		);
		return competence_profile;
	}

	public static getCompetenceProfileById(id: number, competence_profiles: CompetenceProfile[]){
		const index = competence_profiles.findIndex(
			(c) => c.competence_profile_id == id
		);
		return index;
	}
}
