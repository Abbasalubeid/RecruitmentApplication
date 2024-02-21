<script lang="ts">
	import { ErrorHandler } from '$lib/util/errorHandler';
	import { CompetenceProfile } from '../models/CompetenceProfile';
	import ApplicationCard from '../views/ApplicationCardView.svelte';
	import ErrorView from '../views/ErrorView.svelte';
	import { t } from 'svelte-i18n';

	/**
	 * Error-related variables
	 */
	let errorKey: string | undefined;
	let errorStatus: number | undefined;

	/**
	 * Props received from parent component
	 */
	export let competence_profiles: CompetenceProfile[] = [];
	export let applicationMetaData: any;
	export let extraApplicationData: any;
	export let updateTable: any;

    /**
     * Handle status change
     * @param data Event data for status change
     */
	async function onChangeStatus(data: any) {
		try {
			const status = data.target.__value.split(' ')[0];
			const id = data.target.__value.split(' ')[1];
			const resCompetenceProfiles = await fetch('api/competence_profiles', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ status, id })
			});
			if (!resCompetenceProfiles.ok) {
				errorKey = ErrorHandler.handleApiError(new Error());
				errorStatus = resCompetenceProfiles.status;
				return;
			}
			const { updatedId } = await resCompetenceProfiles.json();
			let indexOfOldCompetenceProfile = CompetenceProfile.getCompetenceProfileById(updatedId, competence_profiles)
			competence_profiles[indexOfOldCompetenceProfile].status = status;
			updateTable(competence_profiles);
		} catch (error: any) {
			errorKey = ErrorHandler.handleUnexpectedError(error);
		}
	}

    /**
     * Error message handling
     */
	$: errorMessage = errorKey ? $t(errorKey) : undefined;
</script>

{#if errorMessage}
	<ErrorView {errorMessage} {errorStatus} />
{:else}
	<ApplicationCard {onChangeStatus} {extraApplicationData} metaData={applicationMetaData}
	></ApplicationCard>
{/if}
