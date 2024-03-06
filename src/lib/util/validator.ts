/**
 * Provides static methods for input validation across the application.
 * Methods return localization keys for error messages, facilitating easy integration with localized UIs.
 */
export default class Validator {
	/**
	 * Validates the form data by applying a non-empty check to all fields and additional specific validations as necessary.
	 *
	 * @param {Record<string, string>} formData - The form data keyed by field names with their respective values.
	 * @returns {Record<string, string | undefined>} - An object containing error message keys for each field that fails validation, if any.
	 */
	static validateForm(formData: Record<string, string>): Record<string, string | undefined> {
		const errors: Record<string, string | undefined> = {};

		Object.entries(formData).forEach(([field, value]) => {
			// Perform a generic non-empty check on all fields.
			const nonEmptyError = Validator.isNotEmpty(value);
			if (nonEmptyError) {
				errors[field] = nonEmptyError;
				return; // Skip further checks for this field if it's empty.
			}

			// Delegate to specific field validations.
			const specificError = Validator.validateField(field, value);
			if (specificError) {
				errors[field] = specificError;
			}
		});

		return errors;
	}

	/**
	 * Generic validation to check if a given string is not empty.
	 *
	 * @param {string} value - The string value to validate.
	 * @returns {string | undefined} - An error key if the value is empty, otherwise undefined.
	 */
	private static isNotEmpty(value: string): string | undefined {
		return value.trim() ? undefined : 'requiredField';
	}

	/**
	 * Determines the appropriate specific validation for a given field based on its name and applies it.
	 * This method centralizes field-specific validation logic, making it easier to manage and extend.
	 *
	 * @param {string} field - The name of the field to validate.
	 * @param {string} value - The value of the field to validate.
	 * @returns {string | undefined} - An error key if the field fails its specific validation, otherwise undefined.
	 */
	private static validateField(field: string, value: string): string | undefined {
		switch (field) {
			case 'email':
				return Validator.isEmailValid(value);
			case 'pnr':
				return Validator.isPnrValid(value);
			case 'username':
				return Validator.hasMinLength(value, 3);
			case 'password':
				return Validator.hasMinLength(value, 8);
			default:
				return undefined;
		}
	}

	/**
	 * Validates an email address format.
	 *
	 * @param {string} email - The email address to validate.
	 * @returns {string | undefined} - An error key if the email format is invalid, otherwise undefined.
	 */
	private static isEmailValid(email: string): string | undefined {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailPattern.test(email) ? undefined : 'invalidEmail';
	}

	/**
	 * Validates a social security number (pnr) for format and age constraints.
	 *
	 * @param {string} pnr - The PNR to validate.
	 * @returns {string | undefined} - An error key if the PNR is invalid or the person is too young, otherwise undefined.
	 */
	private static isPnrValid(pnr: string): string | undefined {
		const pnrPattern = /^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])-\d{4}$/;
		if (!pnrPattern.test(pnr)) {
			return 'invalidPnr';
		}
		if (Validator.calculateAge(Validator.parseDateFromPnr(pnr)) < 15) {
			return 'notOldEnough15';
		}
		return undefined;
	}

	/**
	 * Checks if a string meets a specified minimum length requirement.
	 *
	 * @param {string} value - The string to validate.
	 * @param {number} minLength - The minimum length required.
	 * @returns {string | undefined} - An error key if the string is too short, otherwise undefined.
	 */
	private static hasMinLength(value: string, minLength: number): string | undefined {
		return value.length >= minLength ? undefined : `minLength${minLength}`;
	}

	/**
	 * Calculates the age based on a given birth date.
	 *
	 * @param {Date} birthDate - The birth date to calculate age from.
	 * @returns {number} - The calculated age.
	 */
	private static calculateAge(birthDate: Date): number {
		const today = new Date();
		const thisYearBirthday = new Date(
			today.getFullYear(),
			birthDate.getMonth(),
			birthDate.getDate()
		);
		return today.getFullYear() - birthDate.getFullYear() - (today < thisYearBirthday ? 1 : 0);
	}

	/**
	 * Extracts and constructs a Date object from a Personal Identification Number (PNR) string.
	 *
	 * Note: The month is adjusted by subtracting 1 because JavaScript's Date object months are 0-indexed (January is 0, December is 11).
	 *
	 * @param {string} pnr - The pnr string in the format YYYYMMDD-XXXX, where the first 8 digits represent the birthdate.
	 * @returns {Date} - A Date object representing the birthdate extracted from the PNR.
	 */
	private static parseDateFromPnr(pnr: string): Date {
		return new Date(
			parseInt(pnr.substring(0, 4), 10),
			parseInt(pnr.substring(4, 6), 10) - 1,
			parseInt(pnr.substring(6, 8), 10)
		);
	}
}
