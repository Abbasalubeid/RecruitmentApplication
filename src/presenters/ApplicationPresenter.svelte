<script lang="ts">
	import { onMount } from 'svelte';
	import StepperView from '../views/StepperView.svelte';
	import { userStore } from '$lib/stores/userStore';
	import type { Person } from '../models/Person';
	import { ErrorHandler } from '$lib/util/errorHandler';

	let errorKey: string | undefined;
	let errorStatus: number | undefined;
	let errorMessage: string = '';

	let expertise: Array<{ competence_id: number; name: string }> = [];
	let addedExperiences: Array<{ expertise: [number, string]; years: number }> = [];
	let addedAvailability: Array<{ startDay: string; endDay: string }> = [];

	let person: Person | null = null;

	/**
	 * Lifecycle hook for component initialization and data fetching. It attempts to fetch competence data from the API, and handles any errors that might occur during the fetch operation.
	 */
	onMount(async () => {
		userStore.subscribe((userData) => {
			person = userData;
		});

		try {
			const res = await fetch('/api/apply');
			if (!res.ok) {
				errorKey = ErrorHandler.handleApiError(
					new Error('Failed to fetch competences using apply api')
				);
				errorStatus = res.status;
				return;
			}
			const data = await res.json();
			expertise = data.competences;
		} catch (error) {
			errorKey = ErrorHandler.handleUnexpectedError(error as Error);
			console.log(error);
		}
	});

	function onAddExperience(expertise: [number, string], years: number) {
		if (!expertise && !years) {
			errorMessage = 'Please provide an area of expertise and a number of years of experience.';
			return;
		} else if (!expertise[0]) {
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

		startDay = new Date(startDay).toISOString();
		endDay = new Date(endDay).toISOString();

		addedAvailability = [...addedAvailability, { startDay, endDay }];
		errorMessage = '';
	}

	async function onCompleteHandler() {
		try {
			const person_id = person?.person_id;
			const experiences = addedExperiences;
			const availabilities = addedAvailability;
			const resCompetenceProfiles = await fetch('api/apply', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ person_id, experiences, availabilities })
			});
			if (!resCompetenceProfiles.ok) {
				errorKey = ErrorHandler.handleApiError(
					new Error('Failed to insert competence profiles and availabilities using apply api')
				);
				errorStatus = resCompetenceProfiles.status;
				return;
			}
		} catch (error) {
			errorKey = ErrorHandler.handleUnexpectedError(error as Error);
		}
	}
</script>

<StepperView
	{onAddExperience}
	{onAddAvailability}
	{onCompleteHandler}
	{expertise}
	{addedExperiences}
	{addedAvailability}
	{errorMessage}
/>
