/* eslint-disable @typescript-eslint/no-explicit-any */

import { JWT_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';
import prisma from './prismaClient';
import { Person } from '../../models/Person';
import type { Role } from '../../models/Role';

/**
 * Verifies the user's JWT token and retrieves their information from the database.
 *
 * This function decodes the JWT token to extract the username, then queries the database
 * for the user with that username, including their associated role. It ensures that only
 * valid, authenticated users' information is returned.
 *
 * @param {string} token - The JWT token from the client's cookies.
 * @returns {Promise<{ name: string, username: string, role: string } | null>} - An object containing the user's name, username and role if the token is valid, or null if the token is invalid or expired.
 */
export async function authenticateUser(token: string | undefined) {
	if (!token) return null;

	try {
		// Decode the JWT token to extract the username
		const decoded = jwt.verify(token, JWT_SECRET);
		const username = (decoded as any).username;

		const user = await prisma.person.findFirst({
			where: { username },
			include: { role: true }
		});

		if (user && user.role) {
			return new Person(
				user.person_id,
				user.name as string,
				user.surname as string,
				user.email as string,
				user.username as string,
				user.role as Role
			);
		}

		// User not found or role not assigned
		return null;
	} catch (err) {
		// Token is invalid or expired
		return null;
	}
}
