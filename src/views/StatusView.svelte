<script lang="ts">
	import { navigateWithQuery } from '$lib/util/navigation';
	import 'iconify-icon';
	import { t } from 'svelte-i18n';

    	/**
    	* The message to be displayed.
     	* @type {string}
    	*/
	export let message: string;

	/**
	 * The type of view, either 'error', 'welcome' or 'success'.
	 * @type {'error' | 'welcome' | 'success'}
	 * @default 'welcome'
	 */
	export let viewType: 'error' | 'welcome' | 'success' = 'welcome';

	/**
	 * The status number.
	 * @type {number | undefined}
	 * @default undefined
	 */
	export let statusNumber: number | undefined = undefined;

	$: colorClass = viewType === 'error' ? 'error' : 'primary';
	$: mainIcon = viewType === 'error' ? 'bi:exclamation-triangle-fill' : 'uil:user-check';
	$: buttonText = viewType === 'welcome' ? $t('Login') : $t('goToHomepage');
	$: buttonIcon = viewType === 'welcome' ? 'line-md:login' : 'line-md:home-twotone';
	$: buttonBgColor =
		viewType === 'error'
			? 'bg-error-700 hover:bg-error-800'
			: 'bg-primary-700 hover:bg-primary-800';

	function handleButtonClick() {
		viewType === 'error' ? navigateWithQuery(`/`) : navigateWithQuery(`/login`);
	}
</script>

<div class="flex h-screen items-center justify-center">
	<div
		class={`alert variant-ghost flex w-full max-w-md items-center justify-between rounded-lg border border-${colorClass}-400 `}
	>
		<iconify-icon icon={mainIcon} class={`text-${colorClass}-500`} width="35"></iconify-icon>
		<div>
			{#if statusNumber}
				<h5 class="h5">Status - {statusNumber}</h5>
			{/if}
			<h5 class="h5">{message}</h5>
		</div>
		<button
			on:click={handleButtonClick}
			title={buttonText}
			class={`flex items-center gap-2 rounded-full ${buttonBgColor} px-4 py-2`}
		>
			<iconify-icon icon={buttonIcon} width="24" height="24" />
			<span>{buttonText}</span>
		</button>
	</div>
</div>
