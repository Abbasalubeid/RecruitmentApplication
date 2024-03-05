<script lang="ts">
	import { t } from 'svelte-i18n';
	import { navigateWithQuery } from '$lib/util/navigation';
</script>

<div class="mt-[20vh] flex flex-grow flex-col items-center justify-end space-y-4">
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
