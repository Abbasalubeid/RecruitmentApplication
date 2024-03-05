<script lang="ts">
	import { t } from 'svelte-i18n';
	import FormView from '../views/FormView.svelte';
	import LoadingView from '../views/LoadingView.svelte';
	import StatusView from '../views/StatusView.svelte';
	import Validator from '$lib/util/validator';
	import { onMount } from 'svelte';
	import { ErrorHandler } from '$lib/util/errorHandler';

	export let token: string | null;

	let loading = true;
	let success = false;
	let validToken = true;
	let roleID = -1;

	let errorKey: string;
	let errorStatus:  number;
	let inputErrors: Record<string, string | undefined> = {};

	$: title = $t('setupAccount');
	$: recruiterInputs = [
		{ name: 'pnr', label: $t('pnr'), placeholder: $t('pnrFormat'), type: 'text' },
		{ name: 'email', label: $t('email'), placeholder: $t('enterEmail'), type: 'text' },
	];

	$: applicantInputs = [
		{ name: 'username', label: $t('username'), placeholder: $t('chooseUsername'), type: 'text' },
		{ name: 'password', label: $t('password'), placeholder: $t('choosePassword'), type: 'password' }
	];
	
	onMount(async () => {
		const response = await fetch('/api/auth/migration/role_id', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({token})
		});

		if (!response.ok) {
			errorStatus = response.status;

			if (errorStatus == 500) {
				const { errorMessage } = await response.json();
				errorKey = ErrorHandler.handleApiError(new Error(errorMessage))
			} else {
				errorKey = ErrorHandler.handlePageNotFoundError();
			}

			validToken = false;
			loading = false;
			return;
		}

		const result = await response.json();

		roleID = result.role_id;

		loading = false;
	});

	/**
	 * Handle the submit event emitted by the `FormView` component. A POST request to the '/api/auth/migration' endpoint with
	 * the provided social security number (pnr) and email or username and password. Upon success, the database is updated with
	 * the supplied credentials. In case of an error, the appropriate error message is set to be displayed.
	 *
	 * @param {Object} event - The event object containing social security number (pnr) and email or username and password.
	 */
	 async function handleMissingData(event: {
		detail: {
			formData: {
				pnr: string;
				email: string;
				username: string;
				password: string;
			};
		};
	}) {
		loading = true;
		const formData = event.detail.formData;

		inputErrors = Validator.validateForm(formData);

		// If any validation errors exist, do not proceed
		if (Object.keys(inputErrors).some((key) => inputErrors[key] !== undefined)) {
			loading = false;
			return;
		}

		try {
			const response = await fetch('/api/auth/migration', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({token, formData})
			});

			if (!response.ok) {
				const { error } = await response.json();

				if (response.status != 409) {
					errorStatus = response.status;

					if (errorStatus == 500) {
						const { errorMessage } = await response.json();
						errorKey = ErrorHandler.handleApiError(new Error(errorMessage))
					} else {
						errorKey = ErrorHandler.handlePageNotFoundError();
					}

					validToken = false;
				} else {
					if (error.includes('Social Security Number')) {
						errorKey = ErrorHandler.handlePNRInUseError();
					} else if (error.includes('Email')) {
						errorKey = ErrorHandler.handleEmailInUseError();
					} else if (error.includes('Username')) {
						errorKey = ErrorHandler.handleUsernameInUseError();
					}
				}

				loading = false;
				return;
			}

			success = true;
		} catch (error: any) {
			errorKey = ErrorHandler.handleUnexpectedError(error);
		} finally {
			loading = false;
		}
	};

	$: errorMessage = errorKey ? $t(errorKey) : undefined;

	$: translatedInputErrors = Object.entries(inputErrors).reduce(
		(acc: Record<string, string | undefined>, [key, errorKey]) => {
			acc[key] = errorKey ? $t(errorKey) : undefined;
			return acc;
		},
		{}
	);
</script>

{#if loading}
	<LoadingView />
{:else}
	{#if validToken}
		{#if success}
			<StatusView message={$t('setupSuccess')} viewType='success' />
		{:else}
			<FormView
				on:submit={handleMissingData}
				inputs={roleID == 1 ? recruiterInputs : applicantInputs}
				buttonText={$t('submit')}
				title={title}
				{errorMessage}
				inputErrors={translatedInputErrors}
				{loading}
			/>
		{/if}
	{:else}
		<StatusView viewType='error' statusNumber={errorStatus} message={$t(errorKey)} />
	{/if}
{/if}
