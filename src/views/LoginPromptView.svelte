<script lang="ts">
	import { t } from 'svelte-i18n';
	import { navigateWithQuery } from '$lib/util/navigation';
</script>

<div class="flex min-h-screen flex-col items-center justify-center space-y-4">
	<p
		class="bg-gradient-to-br from-primary-400 to-primary-800 bg-clip-text text-center text-2xl font-bold text-transparent"
	>
		{$t('logInToContinue')}
	</p>
	<div class="flex space-x-4">
		<button
			on:click={() => navigateWithQuery(`/login`)}
			class="inline-block cursor-pointer rounded-full border-2 border-primary-500 px-6 py-3 hover:bg-primary-500"
		>
			{$t('login')}
		</button>
		<button
			on:click={() => navigateWithQuery(`/signup`)}
			class="inline-block cursor-pointer rounded-full border-2 border-primary-500 px-6 py-3 hover:bg-primary-500"
		>
			{$t('signup')}
		</button>
	</div>
</div>
