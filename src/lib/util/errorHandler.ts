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
	 * Logs an error message to the server.
	 * 
	 * @param {string} logName - The name of the log to which the error message belongs.
	 * @param {string} errorMessage - The error message to be logged.
	 * @returns {Promise<void>} - A Promise that resolves when the error is logged successfully.
	 */
	private static async logError(logName: string, errorMessage: string){
		await fetch('api/logger', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ errorMessage, logName })
		});
	}
}
