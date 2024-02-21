<script lang="ts">
	import { t } from 'svelte-i18n';
	export let fullName: string;
	export let role: string;
	export let username: string;
</script>

<div class="flex min-h-screen flex-col items-center justify-center space-y-4">
	<h1
		class="bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-4xl font-bold text-transparent"
	>
		{$t('welcome')}, {fullName}!
	</h1>
	<h3 class="text-xl">{$t('username')}: {username}</h3>
	<h3 class="text-xl">{$t('role')}: {$t(role)}</h3>
</div>
