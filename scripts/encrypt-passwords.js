import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

/**
 * Encrypts plaintext passwords for all users in the database using bcrypt.
 */
async function encryptPasswords() {
	// Retrieve all users from the database who have a non-null password.
	const users = await prisma.person.findMany({
		where: {
			password: {
				not: null
			}
		}
	});

	for (const user of users) {
		if (user.password) {
			const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
			// Update the user's record in the database with the hashed password.
			await prisma.person.update({
				where: { person_id: user.person_id },
				data: { password: hashedPassword }
			});

			console.log(`Updated password for user ${user.person_id}`);
		}
	}

	console.log('Finished encrypting passwords.');
}

encryptPasswords()
	.catch((e) => {
		// Log any errors that occur during the execution.
		console.error(e);
		// Exit the process with an error code.
		process.exit(1);
	})
	.finally(async () => {
		// Ensure the PrismaClient connection is properly closed once the operation is complete or if an error occurs.
		await prisma.$disconnect();
	});
