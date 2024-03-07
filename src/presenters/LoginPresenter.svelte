<script lang="ts">
	/**
	 * The `LoginPresenter` serves as the intermediary between the login view and the backend authentication service.
	 * It handles user login events, processes login requests, manages login state (loading, errors).
	 */

	import { t } from 'svelte-i18n';
	import { navigateWithQuery } from '$lib/util/navigation';
	import FormView from '../views/FormView.svelte';
	import Validator from '$lib/util/validator';
	import { ErrorHandler } from '$lib/util/errorHandler';

	export let originallyRequestedPath: string;

	let errorKey: string | undefined;
	let inputErrors: Record<string, string | undefined> = {};
	let loading = false;

	$: inputs = [
		{ name: 'username', label: $t('username'), placeholder: $t('enterUsername'), type: 'text' },
		{ name: 'password', label: $t('password'), placeholder: $t('enterPassword'), type: 'password' }
	];

	/**
	 * Handles the login event emitted by the `FormView` component. It performs a POST request to the
	 * '/api/auth/login' endpoint with the provided username and password.
	 *
	 * @param {Object} event - The event object containing the username and password.
	 */
	async function handleLogin(event: {
		detail: { formData: { username: string; password: string } };
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
			const res = await fetch('/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(event.detail.formData)
			});
			if (!res.ok) {
				const { error } = await res.json();

				if (error.includes('Invalid')) {
					errorKey = ErrorHandler.handleInvalidCredentialsError();
				} else {
					errorKey = ErrorHandler.handleApiError(new Error(error));
				}
				loading = false;
				return;
			}

			const { userInfo } = await res.json();

			if (userInfo.token) {
				navigateWithQuery(`/migration?token=${userInfo.token}`);
			} else {
				navigateWithQuery(originallyRequestedPath, true);
			}
		} catch (error) {
			errorKey = ErrorHandler.handleUnexpectedError(error as Error);
			loading = false;
		}
	}

	$: errorMessage = errorKey ? $t(errorKey) : undefined;

	$: translatedInputErrors = Object.entries(inputErrors).reduce(
		(acc: Record<string, string | undefined>, [key, errorKey]) => {
			acc[key] = errorKey ? $t(errorKey) : undefined;
			return acc;
		},
		{}
	);
</script>

<FormView
	on:submit={handleLogin}
	{inputs}
	inputErrors={translatedInputErrors}
	buttonText={$t('login')}
	title={$t('login')}
	{errorMessage}
	{loading}
/>
