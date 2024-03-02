import fs from 'fs';

/**
 * A utility class for logging errors to files.
 */
export class Logger {
	/**
	 * Logs the given error to a file with the specified name.
	 * If the directory or file does not exist, it will be created.
	 * @param {Error} e - The error object to be logged.
	 * @param {string} logName - The name of the log file.
	 */
	public static logError(e: Error, logName: string) {
		const directoryPath = 'logs';
		const filePath = 'logs/' + logName + '.txt';
		const fileContent = e.message;

		if (!fs.existsSync(directoryPath)) {
			fs.mkdirSync(directoryPath, { recursive: true });
			console.log('Directory created successfully.');
		}

		fs.appendFile(filePath, fileContent + '\n', (err) => {
			if (err) {
				console.error('Error writing to file:', err);
				return;
			}
			console.log('Content has been written to', filePath);
		});
	}
}
