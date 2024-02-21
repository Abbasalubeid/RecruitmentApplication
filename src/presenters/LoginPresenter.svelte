<script lang="ts">
	import LoginView from '../views/LoginView.svelte';
	import { t } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import { Person } from '../models/Person';

	let errorKey: string | undefined;
	let loading = false;

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

			const userInfo = await res.json();
			const person = new Person(
				userInfo.person_id,
				userInfo.name,
				userInfo.surname,
				userInfo.email,
				userInfo.role,
				userInfo.username
			);

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
