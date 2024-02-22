<script lang="ts">
	import { t } from 'svelte-i18n';
	export let fullName: string;
	export let role: string | undefined;
	export let username: string;

	let currentRole = role ? role : '';
</script>

<div class="flex min-h-screen flex-col items-center justify-center space-y-4">
	<h1
		class="h1 bg-gradient-to-br from-primary-500 to-primary-100 bg-clip-text text-center text-2xl font-bold text-transparent"
	>
		{$t('welcome')}, {fullName}!
	</h1>
	<h3 class="text-xl">{$t('username')}: {username}</h3>
	<h3 class="text-xl">{$t('role')}: {$t(currentRole)}</h3>
</div>
