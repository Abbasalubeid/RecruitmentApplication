<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { t } from 'svelte-i18n';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	const dispatch = createEventDispatcher();
	let username = '';
	let password = '';
	export let errorMessage: string = '';
	export let loading: boolean = false;

	$: errorClass = errorMessage !== '' ? 'input-error' : '';

	$: usernameLabel = $t('username');
	$: passwordLabel = $t('password');
	$: loginLabel = $t('login');

	const login = () => {
		dispatch('login', { username, password });
	};
</script>

<div class="flex min-h-screen items-center justify-center">
	<div>
		<form on:submit|preventDefault={login} class="space-y-4">
			<div>
				<label class="label">
					<span>{usernameLabel}</span>
					<input
						class="input mt-1 px-3 py-2 {errorClass}"
						type="text"
						bind:value={username}
						placeholder={usernameLabel}
						required
					/>
				</label>
			</div>
			<div>
				<label class="label">
					<span>{passwordLabel}</span>
					<input
						class="input mt-1 px-3 py-2 {errorClass}"
						type="password"
						bind:value={password}
						placeholder={passwordLabel}
						required
						class:errorClass
					/>
				</label>
			</div>
			<button type="submit" class="variant-filled-primary btn" disabled={loading}>
				{#if loading}
					<ProgressRadial width="w-8" track="stroke-primary-500/30" />
				{:else}
					{loginLabel}
				{/if}
			</button>
			{#if errorMessage}
				<p class="mt-4 text-center text-sm text-error-500">{errorMessage}</p>
			{/if}
		</form>
	</div>
</div>
