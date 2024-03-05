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
	 * Handles unexpected errors.
	 * @param {Error} e - The error object to be handled.
	 * @returns {string} An error message key indicating an unexpected error.
	 */
	public static handleUnexpectedError(e: Error) {
		ErrorHandler.logError('unexpected.log', e.message);
		return 'error.unexpected';
	}

	/**
	 * Handles page not found errors.
	 * @returns {string} An error message key indicating a page not found error.
	 */
	public static handlePageNotFoundError() {
		return 'error.pageNotFound';
	}

	/**
	 * Handles conflicting social security number (pnr) errors.
	 * @returns {string} An error message key indicating a conflicting pnr error.
	 */
	public static handlePNRInUseError() {
		return 'error.pnrInUse';
	}

	/**
	 * Handles conflicting email errors.
	 * @returns {string} An error message key indicating a conflicting email error.
	 */
	public static handleEmailInUseError() {
		return 'error.emailInUse';
	}

	/**
	 * Handles conflicting username errors.
	 * @returns {string} An error message key indicating a conflicting username error.
	 */
	public static handleUsernameInUseError() {
		return 'error.usernameInUse';
	}

	/**
	 * Logs an error message to the server.
	 *
	 * @param {string} logName - The name of the log to which the error message belongs.
	 * @param {string} errorMessage - The error message to be logged.
	 * @returns {Promise<void>} - A Promise that resolves when the error is logged successfully.
	 */
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
