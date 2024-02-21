/* eslint-disable @typescript-eslint/no-unused-vars */

export class ErrorHandler {
	/**
	 * Handles API errors.
	 * @param {Error} e - The error object to be handled.
	 * @returns {string} An error message key indicating an API error.
	 */
	public static handleApiError(e: Error) {
		return 'error.fetchError';
	}

	/**
	 * Handles unexpected errors.
	 * @param {Error} e - The error object to be handled.
	 * @returns {string} An error message key indicating an unexpected error.
	 */
	public static handleUnexpectedError(e: Error) {
		return 'error.unexpected';
	}
}
