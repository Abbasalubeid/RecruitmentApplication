<script lang="ts">
	import { onMount } from 'svelte';
	import TableView from '../views/TableView.svelte';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	import { Competence } from '../models/Competence';
	import { CompetenceProfile } from '../models/CompetenceProfile';

	/**
	 * Stores an array of Competence instances. This will be populated with data
	 * fetched from the API and processed into model instances.
	 */
	let competences: Competence[] = [];

	/**
	 * Fetches competences data from the API upon component mount, transforms the
	 * raw data into model instances, and stores them in the `competences` array.
	 */
	onMount(async () => {
		const res = await fetch('/api/competences');
		const data = await res.json();
		// Mapping over the fetched competences data to create instances of the Competence model.
		competences = data.competences.map(
			(competenceData: {
				competence_profile: CompetenceProfile[];
				competence_id: number;
				name: string;
			}) => {
				// For each competence, map over its competence_profile array to create CompetenceProfile instances.
				const profiles = competenceData.competence_profile.map(
					(profileData) =>
						new CompetenceProfile(
							profileData.competence_profile_id,
							profileData.person_id,
							profileData.competence_id,
							profileData.years_of_experience
						)
				);
				return new Competence(competenceData.competence_id, competenceData.name, profiles);
			}
		);
	});

	/**
	 * Transforms the array of Competence instances into a flat array suitable for
	 * rendering in the TableView component. Each Competence instance might have
	 * multiple CompetenceProfile instances associated with it, which are flattened
	 * into a single array with the `flatMap` method.
	 */
	$: transformedData = competences.flatMap((competence) =>
		competence.competence_profile.map((profile) => ({
			competenceName: competence.name,
			person_id: profile.person_id,
			competence_id: profile.competence_id,
			years_of_experience: profile.formatYearsOfExperience()
		}))
	);

	/**
	 * Prepares the data for the table body by mapping the `transformedData` to the
	 * fields specified.
	 */
	$: bodyData = tableMapperValues(transformedData, [
		'competenceName',
		'person_id',
		'competence_id',
		'years_of_experience'
	]);
</script>

{#if competences.length > 0}
	<TableView
		head={['Competence Name', 'Person ID', 'Competence ID', 'Experience']}
		body={bodyData}
	/>
{/if}
