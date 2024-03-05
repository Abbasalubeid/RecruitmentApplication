<script lang="ts">
	import { t } from 'svelte-i18n';

	/**
     * The full name of the user.
     * @type {string}
     */
	 export let fullName: string;

	/**
	 * The role of the user, if available.
	 * @type {string | undefined}
	 */
	export let role: string | undefined;

	/**
	 * The username of the user.
	 * @type {string}
	 */
	export let username: string;
</script>

<div class="flex min-h-screen flex-col items-center justify-center space-y-4">
	<h1
		class="bg-gradient-to-br from-primary-400 to-primary-800 bg-clip-text text-center text-2xl font-bold text-transparent"
	>
		{$t('welcome')}, {fullName}!
	</h1>
	<h3 class="text-xl">{$t('username')}: {username}</h3>
	{#if role}
		<h3 class="text-xl">{$t('role')}: {$t(role)}</h3>
	{/if}
</div>
