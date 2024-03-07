<script lang="ts">
	import { onMount } from 'svelte';
	import StepperView from '../views/StepperView.svelte';
	import { userStore } from '$lib/stores/userStore';
	import type { Person } from '../models/Person';
	import { ErrorHandler } from '$lib/util/errorHandler';
	import Validator from '$lib/util/validator';

	let errorKey: string | undefined;
	let errorStatus: number | undefined;
	let displayMessage: string = '';
	const maxYearsOfExperience: number = 99;

	let expertise: Array<{ competence_id: number; name: string }> = [];
	let addedExperiences: Array<{ expertise: [number, string]; years: number }> = [];
	let addedAvailability: Array<{ startDay: string; endDay: string }> = [];

	let person: Person | null = null;

	/**
	 * Async function for initialization and data fetching.
	 * It gets the user that is logged in and then attempts to
	 * fetch competence data from the API, and handles
	 * any errors that might occur during the fetch operation.
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

	/**
	 * Function to validate and save user submitted experiences.
	 */
	function onAddExperience(expertise: [number, string], years: number) {
		if (!expertise && !years) {
			displayMessage = 'provide expertise and years of experience';
			return;
		} else if (!expertise[0]) {
			displayMessage = 'provide expertise';
			return;
		} else if (!years) {
			displayMessage = 'provide years of experience';
			return;
		}

		displayMessage = Validator.isYearsOfExperienceInvalid(years);
		if (displayMessage) {
			return;
		}

		if (addedExperiences.some((exp) => exp.expertise === expertise)) {
			displayMessage = 'already added experience';
			return;
		}

		addedExperiences = [...addedExperiences, { expertise, years }];
		displayMessage = '';
	}

	function onAddAvailability(startDay: string, endDay: string) {
		if (!startDay && !endDay) {
			displayMessage = 'provide start and end day';
			return;
		} else if (!startDay) {
			displayMessage = 'provide start day';
			return;
		} else if (!endDay) {
			displayMessage = 'provide end day';
			return;
		}

		if (new Date(startDay) < new Date()) {
			displayMessage = 'startday in past';
			return;
		} else if (new Date(endDay) < new Date(startDay)) {
			displayMessage = 'endday before startday';
			return;
		}

		displayMessage = Validator.isDateRangeInvalid(startDay, endDay);

		if (displayMessage) {
			return;
		}

		startDay = new Date(startDay).toISOString();
		endDay = new Date(endDay).toISOString();

		addedAvailability = [...addedAvailability, { startDay, endDay }];
		displayMessage = '';
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

		addedAvailability = [];
		addedExperiences = [];
		displayMessage = 'application submitted';
	}
</script>

<StepperView
	{onAddExperience}
	{onAddAvailability}
	{onCompleteHandler}
	{expertise}
	{addedExperiences}
	{addedAvailability}
	{displayMessage}
/>
