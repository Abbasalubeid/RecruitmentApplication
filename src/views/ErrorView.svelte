<script lang="ts">
	export let errorMessage: string;
	export let errorStatus: number = 500;

	import 'iconify-icon';
	import { t } from 'svelte-i18n';
</script>

{#if errorMessage}
	<div class="flex h-screen items-center justify-center">
		<div
			class="alert variant-ghost flex w-full max-w-md items-center justify-between rounded-lg border border-red-400 bg-red-100 text-red-700"
		>
			<div class="alert-errorMessage">
				<h3 class="text-lg font-semibold">
					Error {#if typeof errorStatus === 'number'}
						- {errorStatus}{/if}
				</h3>
				<p>{errorMessage}</p>
			</div>
			<a href="/">
				<button
					title="Go to homepage"
					class="flex items-center gap-2 rounded-full bg-red-700 px-4 py-2 text-white hover:bg-red-800"
				>
					<iconify-icon icon="line-md:arrow-left" class="text-white" width="24" height="24" />
					<span>{$t('goToHomepage')}</span>
				</button>
			</a>
		</div>
	</div>
{/if}
