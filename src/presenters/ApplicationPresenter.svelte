<script lang="ts">
	import { onMount } from 'svelte';
	import StepperView from '../views/StepperView.svelte';

	let expertise: Array<{ id: number; name: string }> = [];
	let errorKey: string | undefined;
	let errorStatus: number | undefined;
	let errorMessage: string = '';

	let addedExperiences: Array<{ expertise: string; years: number }> = [];
	let addedAvailability: Array<{ startDay: string; endDay: string }> = [];

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
		if (!expertise && !years) {
			errorMessage = 'Please provide an area of expertise and a number of years of experience.';
			return;
		} else if (!expertise) {
			errorMessage = 'Please provide an area of expertise.';
			return;
		} else if (!years) {
			errorMessage = 'Please provide a number of years of experience.';
			return;
		}

		if (years > 99) {
			errorMessage = 'Please provide a number of years of experience less than 100.';
			return;
		} else if (years < 0) {
			errorMessage = 'Please provide a number of years of experience greater than 0.';
			return;
		}

		if (addedExperiences.some((exp) => exp.expertise === expertise)) {
			errorMessage = 'You have already added this experience.';
			return;
		}

		addedExperiences = [...addedExperiences, { expertise, years }];
		errorMessage = '';
	}

	function onAddAvailability(startDay: string, endDay: string) {
		if (!startDay && !endDay) {
			errorMessage = 'Please provide both start day and end day.';
			return;
		} else if (!startDay) {
			errorMessage = 'Please provide a start day.';
			return;
		} else if (!endDay) {
			errorMessage = 'Please provide an end day.';
			return;
		}

		if (new Date(startDay) < new Date()) {
			errorMessage = 'Start day cannot be in the past.';
			return;
		} else if (new Date(endDay) < new Date(startDay)) {
			errorMessage = 'End day cannot be before the start day.';
			return;
		}

		addedAvailability = [...addedAvailability, { startDay, endDay }];
		errorMessage = '';
	}
</script>

<StepperView
	{expertise}
	{onAddExperience}
	{onAddAvailability}
	{addedExperiences}
	{addedAvailability}
	{errorMessage}
/>
