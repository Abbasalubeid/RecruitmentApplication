<script lang="ts">
	import { navigateWithQuery } from '$lib/util/navigation';

	export let errorMessage: string;
	export let errorStatus: number | undefined = undefined;

	import 'iconify-icon';
	import { t } from 'svelte-i18n';
</script>

{#if errorMessage}
	<div class="flex h-screen items-center justify-center">
		<div
			class="alert variant-ghost flex w-full max-w-md items-center justify-between rounded-lg border border-error-400 bg-error-100 text-error-700"
		>
			<iconify-icon icon="bi:exclamation-triangle-fill" class="text-error-500" width="35"
			></iconify-icon>
			<div>
				<h5 class="h5">
					{#if typeof errorStatus === 'number'}
						Error - {errorStatus}{/if}
				</h5>
				<h5 class="h5">{errorMessage}</h5>
			</div>
			<button
				on:click={() => navigateWithQuery(`/`)}
				title="Go to homepage"
				class="flex items-center gap-2 rounded-full bg-error-700 px-4 py-2 hover:bg-error-800"
			>
				<iconify-icon icon="line-md:arrow-left" width="24" height="24" />
				<span>{$t('goToHomepage')}</span>
			</button>
		</div>
	</div>
{/if}
