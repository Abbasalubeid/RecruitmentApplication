<script lang="ts">
	import { onMount } from 'svelte';
	import TableView from '../views/TableView.svelte';
	import ErrorView from '../views/ErrorView.svelte';
	import LoadingView from '../views/LoadingView.svelte';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	import { Competence } from '../models/Competence';
	import { CompetenceProfile } from '../models/CompetenceProfile';

	/**
	 * Stores an array of Competence instances. This will be populated with data
	 * fetched from the API and processed into model instances.
	 */
	let competences: Competence[] = [];

	let errorMessage: string | undefined;
	let errorStatus: number | undefined;
	let isLoading: boolean = false;

	/**
	 * Fetches competences data from the API upon component mount, transforms the
	 * raw data into model instances, and stores them in the `competences` array.
	 */
	onMount(async () => {
		try {
			isLoading = true;
			const res = await fetch('/api/competences');
			if (!res.ok) {
				errorMessage = res.statusText;
				errorStatus = res.status;
				return;
			}
			const data = await res.json();
			competences = data.competences.map((competenceData: Competence) => {
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
			});
		} catch (error) {
			errorMessage = 'An unexpected error occurred while fetching competences.';
		} finally {
			isLoading = false;
		}
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

{#if errorMessage}
	<ErrorView {errorMessage} {errorStatus} />
{:else if competences.length > 0}
	<TableView
		head={['Competence Name', 'Person ID', 'Competence ID', 'Experience']}
		body={bodyData}
	/>
{:else}
	<LoadingView message={'Fetching competences'} />
{/if}
