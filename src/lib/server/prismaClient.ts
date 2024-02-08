import { PrismaClient } from '@prisma/client';

/**
 * Singleton instance of PrismaClient.
 * Used to interact with the database throughout the application.
 */

const prisma = new PrismaClient();

export default prisma;
