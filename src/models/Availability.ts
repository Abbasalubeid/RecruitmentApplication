/* eslint-disable @typescript-eslint/no-explicit-any */
export class Availability {
	availability_id: number;
	person_id: number;
	from_date: string;
	to_date: string;

	/**
     * Constructs a new Availability object.
     * @param {number} availability_id - The unique identifier for the availability.
     * @param {string} from_date - The start date of the availability.
     * @param {number} person_id - The unique identifier for the person associated with the availability.
     * @param {string} to_date - The end date of the availability.
     */
	constructor(
		availability_id: number,
        from_date: string,
        person_id: number,
        to_date: string
	) {
		this.availability_id = availability_id;
		this.person_id = person_id;
		this.from_date = from_date;
		this.to_date = to_date;
	}

	public static getAvailabilitiesForPerson(person: any, availabilities: Availability[]) {
		const personAvailability = availabilities.filter((a) => a.person_id === person?.person_id);
		return personAvailability;
	}
}