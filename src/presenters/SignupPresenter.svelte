<script lang="ts">
	/**
	 * The `SignupPresenter` acts as a bridge between the signup form and the server-side signup logic.
	 * It manages the state of the signup process, including form inputs, loading status, error messages,
	 * and the transition to a success state upon successful account creation.
	 */

	import { t } from 'svelte-i18n';
	import FormView from '../views/FormView.svelte';
	import StatusView from '../views/StatusView.svelte';

	let errorKey: string | undefined;
	let loading = false;
	let signupSuccess = false;
	let username = 'test';

	$: inputs = [
		{ name: 'name', label: $t('name'), placeholder: $t('enterName'), type: 'text' },
		{ name: 'surname', label: $t('surname'), placeholder: $t('enterSurname'), type: 'text' },
		{ name: 'pnr', label: $t('pnr'), placeholder: $t('pnrFormat'), type: 'text' },
		{ name: 'email', label: $t('email'), placeholder: $t('enterEmail'), type: 'email' },
		{ name: 'username', label: $t('username'), placeholder: $t('chooseUsername'), type: 'text' },
		{ name: 'password', label: $t('password'), placeholder: $t('choosePassword'), type: 'password' }
	];

	/**
	 * Handles the submission of the signup form. It sends the form data to the server
	 * and processes the response, updating the UI based on the outcome.
	 *
	 * @param {Object} event - The event object containing the form data.
	 */
	async function handleSignup(event: {
		detail: {
			formData: {
				name: string;
				surname: string;
				pnr: string;
				email: string;
				username: string;
				password: string;
			};
		};
	}) {
		loading = true;
		const formData = event.detail.formData;

		try {
			const response = await fetch('/api/auth/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			if (!response.ok) {
				const { error } = await response.json();
				if (error.includes('username')) {
					errorKey = error.includes('email') ? 'error.usernameEmailInUse' : 'error.usernameInUse';
				} else if (error.includes('email')) {
					errorKey = 'error.emailInUse';
				} else {
					errorKey = 'error.signupFailed';
				}
				loading = false;
				return;
			}
			const { newUser } = await response.json();
			console.log(newUser);

			username = newUser.name;

			signupSuccess = true;
		} catch (error) {
			errorKey = 'error.unexpected';
			loading = false;
		}
	}

	$: errorMessage = errorKey ? $t(errorKey) : undefined;
</script>

{#if signupSuccess}
	<StatusView message={$t('createdAccount') + username} viewType="welcome" />
{:else}
	<FormView
		on:submit={handleSignup}
		{inputs}
		buttonText={$t('signup')}
		title={$t('signup')}
		{errorMessage}
		{loading}
	/>
{/if}
