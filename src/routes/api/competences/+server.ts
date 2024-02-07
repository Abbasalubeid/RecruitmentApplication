import prisma from '$lib/server/prismaClient';
import { json } from '@sveltejs/kit';

export async function GET() {
	const competences = await prisma.competence.findMany({
		include: {
			competence_profile: true // Include related competence
		}
	});
	return json({ competences });
}
