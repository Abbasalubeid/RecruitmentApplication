<script lang="ts">
	/**
	 * The `LoginPresenter` serves as the intermediary between the login view and the backend authentication service.
	 * It handles user login events, processes login requests, manages login state (loading, errors).
	 */

	import LoginView from '../views/LoginView.svelte';
	import { t } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import { userStore } from '$lib/stores/UserStore';
	import { Person } from '../models/Person';

	let errorKey: string | undefined;
	let loading = false;

	/**
	 * Handles the login event emitted by the `LoginView` component. It performs a POST request to the
	 * '/api/auth/login' endpoint with the provided username and password. Upon successful authentication,
	 * it updates the userStore with the logged-in user's information and redirects to the homepage.
	 * In case of an error, it sets the appropriate error message to be displayed.
	 *
	 * @param {Object} event - The event object containing the username and password.
	 */
	const handleLogin = async (event: { detail: { username: string; password: string } }) => {
		loading = true;
		const { username, password } = event.detail;
		try {
			const res = await fetch('/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ username, password })
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

			const { userInfo } = await res.json();
			const person = new Person(
				userInfo.person_id,
				userInfo.name,
				userInfo.surname,
				userInfo.email,
				userInfo.role,
				userInfo.username
			);
			userStore.updateUser(person);

			const queryParams = new URLSearchParams(window.location.search);
			const lang = queryParams.get('lang');

			goto(`/?${lang ? `lang=${lang}` : ''}`);
		} catch (err) {
			errorKey = 'error.unexpected';
			loading = false;
		}
	};

	$: errorMessage = errorKey ? $t(errorKey) : undefined;
</script>

<LoginView on:login={handleLogin} {errorMessage} {loading} />
