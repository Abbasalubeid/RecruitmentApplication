<script lang="ts">
	import { t } from 'svelte-i18n';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function requestLogin() {
		dispatch('requestLogin');
	}
</script>

<div class="flex min-h-screen flex-col items-center justify-center space-y-4">
	<p
		class="bg-gradient-to-br from-primary-500 to-primary-100 bg-clip-text text-center text-2xl font-bold text-transparent"
	>
		{$t('logInToContinue')}
	</p>
	<button
		on:click={requestLogin}
		class="inline-block cursor-pointer rounded-full border-2 border-primary-500 bg-transparent px-6 py-3 hover:bg-primary-900"
	>
		{$t('login')}
	</button>
</div>
