export class Utilities {
	/**
	 * Capitalizes the first letter of a given string.
	 * @param {string} str - The string to capitalize.
	 * @returns {string} The input string with the first letter capitalized, if it exists; otherwise, returns the original string.
	 */
	public static capitalizeFirstLetter(str: string): string {
		if (!str) return str;
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	/**
	 * Lowercases the first letter of a string.
	 * @param {string} str - The input string.
	 * @returns {string} The input string with the first letter lowercased.
	 */
	public static lowercaseFirstLetter(str: string): string {
		if (str.length === 0) {
			return str;
		} else {
			return str[0].toLowerCase() + str.slice(1);
		}
	}
}
