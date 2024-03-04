<script lang="ts">
	import { t } from 'svelte-i18n';
	import FormView from '../views/FormView.svelte';
	import StatusView from '../views/StatusView.svelte';

	export let token: string | null;

	let errorKey: string | undefined;
	let loading = false;
	let success = false;
	let validToken = true;

	// TODO
	// Set based on role_id from token in URL
	$: title = $t('setupAccount');
	$: inputs = [
		{ name: 'username', label: $t('username'), placeholder: $t('chooseUsername'), type: 'text' },
		{ name: 'password', label: $t('password'), placeholder: $t('choosePassword'), type: 'password' }
	];

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
				pnr: string | never;
				email: string | never;
				username: string | never;
				password: string | never;
			};
		};
	}) {
		loading = true;
		const formData = event.detail.formData;

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
				errorKey = error;
				return;
			}

			success = true;
		} catch (error) {
			errorKey = 'error.unexpected';
		} finally {
			loading = false;
		}
	};

	$: errorMessage = errorKey ? $t(errorKey) : undefined;
</script>

{#if validToken}
	{#if success}
		<StatusView message={$t('setupSuccess')} viewType="welcome" />
	{:else}
		<FormView
			on:submit={handleMissingData}
			{inputs}
			buttonText={$t('submit')}
			title={title}
			{errorMessage}
			{loading}
		/>
	{/if}
{:else}
	<StatusView viewType='error' statusNumber={404} message={$t('error.pageNotFound')} />
{/if}
