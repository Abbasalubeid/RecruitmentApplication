<script lang="ts">
	/**
	 * The `LoginPresenter` serves as the intermediary between the login view and the backend authentication service.
	 * It handles user login events, processes login requests, manages login state (loading, errors).
	 */

	import { t } from 'svelte-i18n';
	import { navigateWithQuery } from '$lib/util/navigation';
	import FormView from '../views/FormView.svelte';

	export let originallyRequestedPath: string;

	let errorKey: string | undefined;
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
				errorKey =
					error && error.includes('Invalid username or password')
						? 'error.invalidCredentials'
						: 'error.unexpected';
				loading = false;
				return;
			}

			navigateWithQuery(originallyRequestedPath, true);
		} catch (error) {
			errorKey = 'error.unexpected';
			loading = false;
		}
	}

	$: errorMessage = errorKey ? $t(errorKey) : undefined;
</script>

<FormView
	on:submit={handleLogin}
	{inputs}
	buttonText={$t('login')}
	title={$t('login')}
	{errorMessage}
	{loading}
/>
