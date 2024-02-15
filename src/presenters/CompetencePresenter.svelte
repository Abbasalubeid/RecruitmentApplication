<script lang="ts">
	/**
	 * The CompetencePresenter component serves as a mediator between the model and view for displaying competences. Upon initialization, it fetches competence data from a designated API, processes the received data into structured models, and prepares it for presentation by the TableView component.
	 */

	import { onMount } from 'svelte';
	import { t } from 'svelte-i18n';
	import TableView from '../views/TableView.svelte';
	import ErrorView from '../views/ErrorView.svelte';
	import LoadingView from '../views/LoadingView.svelte';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	import { Competence } from '../models/Competence';
	import { CompetenceProfile } from '../models/CompetenceProfile';

	let competences: Competence[] = [];
	let errorKey: string | undefined;
	let errorStatus: number | undefined;
	let isLoading: boolean = false;

	/**
	 * Lifecycle hook for component initialization and data fetching. It attempts to fetch competence data from the API, processes the response into Competence model instances, and handles any errors that might occur during the fetch operation.
	 */
	onMount(async () => {
		try {
			isLoading = true;
			const res = await fetch('/api/competences');
			if (!res.ok) {
				errorKey = 'error.fetchError';
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
			errorKey = 'error.unexpected';
		} finally {
			isLoading = false;
		}
	});

	$: errorMessage = errorKey ? $t(errorKey).toString() : undefined;

	/**
	 * Transforms the array of Competence instances into a flat array suitable for rendering in the TableView component. Each Competence instance might have multiple CompetenceProfile instances associated with it, which are flattened into a single array.
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
	 * Prepares the data for the table body by mapping the transformed competence data to the specified fields. This ensures the data structure aligns with the TableView component's requirements for rendering.
	 */
	$: bodyData = tableMapperValues(transformedData, [
		'competenceName',
		'person_id',
		'competence_id',
		'years_of_experience'
	]);

	$: translatedHead = [
		$t('competenceName').toString(),
		$t('personId').toString(),
		$t('competenceId').toString(),
		$t('yearsOfExperience').toString()
	];
</script>

{#if errorMessage}
	<ErrorView {errorMessage} {errorStatus} />
{:else if competences.length > 0}
	<TableView head={translatedHead} body={bodyData} />
{:else}
	<LoadingView message={$t('loading')} />
{/if}
