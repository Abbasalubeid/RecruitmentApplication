/* eslint-disable @typescript-eslint/no-unused-vars */

export class ErrorHandler {
	/**
	 * Handles API errors.
	 * @param {Error} e - The error object to be handled.
	 * @returns {string} An error message key indicating an API error.
	 */
	public static handleApiError(e: Error) {
		ErrorHandler.logError('api.log', e.message);
		return 'error.fetchError';
	}

	/**
	 * Logs errors that occurs when users fails to logout.
	 * @param {Error} e - The error object to be handled.
	 * @returns {string} An error message key indicating a logout error.
	 */
	public static handleLogoutError(e: Error) {
		ErrorHandler.logError('logout.log', e.message);
	}

	/**
	 * Handles unexpected errors.
	 * @param {Error} e - The error object to be handled.
	 * @returns {string} An error message key indicating an unexpected error.
	 */
	public static handleUnexpectedError(e: Error) {
		ErrorHandler.logError('unexpected.log', e.message);
		return 'error.unexpected';
	}

	/**
	 * Handles API errors.
	 * @param {Error} e - The error object to be handled.
	 * @returns {string} An error message key indicating an API error.
	 */
	public static handleAbortError(e: Error) {
		return 'error.fetchError';
	}

	private static async logError(logName: string, errorMessage: string) {
		await fetch('api/logger', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ errorMessage, logName })
		});
	}
}
