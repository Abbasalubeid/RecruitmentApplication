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
}
