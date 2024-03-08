/* eslint-disable @typescript-eslint/no-explicit-any */

export class CompetenceProfile {
	competence_profile_id: number;
	person_id: number;
	competence_id: number;
	years_of_experience: number;
	status: string;
	version : number;

	/**
	 * Constructs a new CompetenceProfile instance.
	 * @param competence_profile_id The ID of the competence profile.
	 * @param person_id The ID of the person associated with this competence profile.
	 * @param competence_id The ID of the competence associated with this profile.
	 * @param years_of_experience The years of experience in this competence profile.
	 * @param status The current status of this competence profile.
	 * @param version The current version of this competence profile.
	 */
	constructor(
		competence_profile_id: number,
		person_id: number,
		competence_id: number,
		years_of_experience: number,
		status: string,
		version : number
	) {
		this.competence_profile_id = competence_profile_id;
		this.person_id = person_id;
		this.competence_id = competence_id;
		this.years_of_experience = years_of_experience;
		this.status = status;
		this.version = version;
	}

	/**
	 * Extracts the years and months from the total years of experience.
	 * @returns {Array<number>} An array containing the years and months.
	 */
	extractYearsAndMonths(): Array<number> {
		const years = Math.floor(this.years_of_experience);
		const months = Math.round((this.years_of_experience - years) * 12);
		return [years, months];
	}
}
