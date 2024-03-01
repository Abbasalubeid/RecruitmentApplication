<script lang="ts">
	import { onMount } from 'svelte';
	import StepperView from '../views/StepperView.svelte';

	let expertise: Array<{ id: number; name: string }> = [];
	let errorKey: string | undefined;
	let errorStatus: number | undefined;

	let addedExperiences: Array<{ expertise: string; years: number }> = [];
	let addedAvailability: Array<{ startDay: number; endDay: number }> = [];

	/**
	 * Lifecycle hook for component initialization and data fetching. It attempts to fetch competence data from the API, and handles any errors that might occur during the fetch operation.
	 */
	onMount(async () => {
		try {
			const res = await fetch('/api/apply');
			if (!res.ok) {
				errorKey = 'error.fetchError';
				errorStatus = res.status;
				return;
			}
			const data = await res.json();
			expertise = data.competences;
		} catch (error) {
			errorKey = 'error.unexpected';
		}
	});

	function onAddExperience(expertise: string, years: number) {
		addedExperiences = [...addedExperiences, { expertise, years }];
	}

	function onAddAvailability(startDay: number, endDay: number) {
		addedAvailability = [...addedAvailability, { startDay, endDay }];
	}
</script>

<StepperView
	{expertise}
	{onAddExperience}
	{onAddAvailability}
	{addedExperiences}
	{addedAvailability}
/>
