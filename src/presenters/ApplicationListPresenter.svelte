<script lang="ts">
	import { tableMapperValues, type PaginationSettings } from '@skeletonlabs/skeleton';
	import PaginatorView from '../views/PaginatorView.svelte';
	import { t } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import { ErrorHandler } from '$lib/util/errorHandler';
	import { CompetenceProfile } from '../models/CompetenceProfile';
	import ErrorView from '../views/ErrorView.svelte';
	import LoadingView from '../views/LoadingView.svelte';
	import { Person } from '../models/Person';
	import { Competence } from '../models/Competence';
	import { Availability } from '../models/Availability';
	import ApplicationCardPresenter from './ApplicationCardPresenter.svelte';
	import SearchboxPresenter from '../presenters/SearchboxPresenter.svelte';

	/**
	 * Data variables
	 */
	let availabilities: Availability[] = [];
	let competences: Competence[] = [];
	let persons: Person[] = [];
	let competence_profiles: CompetenceProfile[] = [];
	let isLoading: boolean = false;
	let errorKey: string | undefined;
	let errorStatus: number | undefined;

	/**
	 * On component mount, fetch data and initialize component
	 */
	onMount(async () => {
		try {
			isLoading = true;
			const resCompetenceProfiles = await fetch('/api/competence_profiles');
			if (!resCompetenceProfiles.ok) {
				errorKey = ErrorHandler.handleApiError(
					new Error('Api fetch failed: Could not load /api/competence_profiles')
				);
				errorStatus = resCompetenceProfiles.status;
				return;
			}
			const dataCompetenceProfiles = await resCompetenceProfiles.json();

			competence_profiles = dataCompetenceProfiles.competence_profile.map(
				(profileData: any) =>
					new CompetenceProfile(
						profileData.competence_profile_id,
						profileData.person_id,
						profileData.competence_id,
						profileData.years_of_experience,
						profileData.status
					)
			);

			const resPerson = await fetch('/api/persons');

			if (!resPerson.ok) {
				errorKey = ErrorHandler.handleApiError(
					new Error('Api fetch failed: Could not load /api/persons')
				);
				errorStatus = resPerson.status;
				return;
			}
			const dataPerson = await resPerson.json();
			persons = dataPerson.person.map(
				(personData: any) =>
					new Person(
						personData.person_id,
						personData.name,
						personData.surname,
						personData.email,
						personData.username
					)
			);

			const resCompetence = await fetch('api/competences');
			if (!resCompetence.ok) {
				errorKey = ErrorHandler.handleApiError(
					new Error('Api fetch failed: Could not load api/competences')
				);
				errorStatus = resCompetence.status;
				return;
			}
			const dataCompetence = await resCompetence.json();
			competences = dataCompetence.competences.map((competenceData: Competence) => {
				const profiles = competenceData.competence_profile.map(
					(profileData) =>
						new CompetenceProfile(
							profileData.competence_profile_id,
							profileData.person_id,
							profileData.competence_id,
							profileData.years_of_experience,
							profileData.status
						)
				);
				return new Competence(competenceData.competence_id, competenceData.name, profiles);
			});

			const resAvailability = await fetch('/api/availability');

			if (!resAvailability.ok) {
				errorKey = ErrorHandler.handleApiError(
					new Error('Api fetch failed: Could not load /api/availability')
				);
				errorStatus = resAvailability.status;
				return;
			}
			const dataAvailability = await resAvailability.json();
			availabilities = dataAvailability.availability.map(
				(availability: any) =>
					new Availability(
						availability.availability_id,
						availability.from_date,
						availability.person_id,
						availability.to_date
					)
			);
		} catch (error: any) {
			errorKey = ErrorHandler.handleUnexpectedError(error);
		} finally {
			isLoading = false;
		}
	});

	/**
	 * Error message handling
	 */
	$: errorMessage = errorKey ? $t(errorKey) : undefined;

	/**
	 * Pagination settings
	 */
	$: paginationSettings = {
		page: 0,
		limit: 5,
		size: competence_profiles.length,
		amounts: [1, 2, 5, 10]
	} satisfies PaginationSettings;

	/**
	 * Paginated source data
	 */
	$: paginatedSource = competence_profiles.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);

	/**
	 * Translated table headers
	 */
	$: translatedHead = [$t('personName'), $t('competence'), $t('status')];

	/**
	 * Transformed data for table display
	 */
	$: transformedData = paginatedSource.map((profile) => {
		const person = persons.find((p) => p.person_id === profile.person_id);

		const fullName = person ? `${person.name} ${person.surname}` : profile.person_id;

		const competence = competences.find((c) => c.competence_id === profile.competence_id);

		const job = competence ? $t(`${competence.name}`) : profile.competence_id;
		return {
			personName: fullName,
			competence: job,
			status: $t(profile.status)
		};
	});

	/**
	 * Body data for table display
	 */
	$: bodyData = tableMapperValues(transformedData, ['personName', 'competence', 'status']);

	/**
	 * Handle pagination changes
	 */

	function onPageinatorChange(): void {
		paginatedSource = competence_profiles.slice(
			paginationSettings.page * paginationSettings.limit,
			paginationSettings.page * paginationSettings.limit + paginationSettings.limit
		);
	}

	/**
	 * Flag to show/hide application card and metadata concerning the application
	 */
	let showApplication = false;
	let applicationMetaData: any;
	let extraApplicationData: any;

	/**
	 * Handle table selection
	 * @param meta Metadata for the selected table entry
	 */
	function onSelectedTable(meta: any): void {
		showApplication = true;
		applicationMetaData = meta;
		let competence = competences.find((c) => $t(c.name) === applicationMetaData.detail[1]);
		let person = persons.find(
			(p) =>
				p.name === applicationMetaData.detail[0].split(' ')[0] &&
				p.surname === applicationMetaData.detail[0].split(' ')[1]
		);

		let competence_profile = competence_profiles.find(
			(cp) => cp.competence_id === competence?.competence_id && cp.person_id === person?.person_id
		);

		let personAvailability = availabilities.filter((a) => a.person_id === person?.person_id);
		extraApplicationData = [competence_profile, personAvailability];
	}

	/**
	 * Update competence_profiles data
	 * @param new_competence_profiles New competence profiles data
	 */
	function updateTable(new_competence_profiles: CompetenceProfile[]): void {
		competence_profiles = new_competence_profiles;
	}

	/**
	 * Sets the status to hide or display the application.
	 * @param {boolean} status - The boolean status to set for the application.
	 */
	function setApplicationBoolean(status: boolean) {
		showApplication = status;
	}
</script>

{#if errorMessage}
	<ErrorView {errorMessage} {errorStatus} />
{:else if competence_profiles.length > 0}
	<PaginatorView
		interactive={true}
		{onSelectedTable}
		{onPageinatorChange}
		classSetting="mx-auto w-5/6 mt-5"
		head={translatedHead}
		body={bodyData}
		settings={paginationSettings}
		showFirstLastButtons={true}
		showPreviousNextButtons={true}
	/>
	<SearchboxPresenter
		{setApplicationBoolean}
		{updateTable}
		{competences}
		{persons}
		{competence_profiles}
	></SearchboxPresenter>
	{#if showApplication}
		<ApplicationCardPresenter
			{competence_profiles}
			{updateTable}
			{extraApplicationData}
			{applicationMetaData}
		></ApplicationCardPresenter>
	{/if}
{:else}
	<LoadingView />
{/if}
