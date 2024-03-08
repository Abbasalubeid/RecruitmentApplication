<script lang="ts">
	import { ErrorHandler } from '$lib/util/errorHandler';
	import { CompetenceProfile } from '../models/CompetenceProfile';
	import ApplicationCard from '../views/ApplicationCardView.svelte';
	import { t } from 'svelte-i18n';
	import StatusView from '../views/StatusView.svelte';
	import { showStatusChangeErrorStore } from '../lib/stores/showStatusChangeErrorStore';

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

	$: showStatusChangeError = $showStatusChangeErrorStore;

	/**
	 * Handle status change
	 * @param data Event data for status change
	 */
	async function onChangeStatus(data: any) {
		try {
			const status = data.target.__value.split(' ')[0];
			const id = data.target.__value.split(' ')[1];
			const version = extraApplicationData[0].version;
			const resCompetenceProfiles = await fetch('api/competence_profiles', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ status, id, version })
			});
			if (!resCompetenceProfiles.ok) {
				if (resCompetenceProfiles.status === 520) {
					showStatusChangeErrorStore.set(true);
					return;
				}
				errorKey = ErrorHandler.handleApiError(new Error());
				errorStatus = resCompetenceProfiles.status;
				return;
			}
			const { updatedId } = await resCompetenceProfiles.json();
			let indexOfOldCompetenceProfile = competence_profiles.findIndex(
				(c) => c.competence_profile_id == id
			);
			competence_profiles[indexOfOldCompetenceProfile].status = status;
			competence_profiles[indexOfOldCompetenceProfile].version = version+1;
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
	<StatusView message={errorMessage} statusNumber={errorStatus} viewType="error" />
{:else}
	<ApplicationCard
		{onChangeStatus}
		{showStatusChangeError}
		{extraApplicationData}
		metaData={applicationMetaData}
	></ApplicationCard>
{/if}
