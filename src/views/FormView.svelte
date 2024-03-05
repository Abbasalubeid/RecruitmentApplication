<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { t } from 'svelte-i18n';

	const dispatch = createEventDispatcher();

	/**
	 * The title of the form.
	 * @type {string}
	 */
	export let title: string;

	/**
	 * Array of input fields with their properties.
	 * @type {Array<{ name: string; label: string; placeholder: string; type: string }>}
	 */
	export let inputs: Array<{ name: string; label: string; placeholder: string; type: string }> = [];

	/**
	 * Object containing input errors, keyed by input name.
	 * @type {Record<string, string | undefined>}
	 */
	export let inputErrors: Record<string, string | undefined> = {};

	/**
	 * The text displayed on the submit button.
	 * @type {string}
	 */
	export let buttonText: string;

	/**
	 * The error message to be displayed, if any.
	 * @type {string | undefined}
	 */
	export let errorMessage: string | undefined;

	/**
	 * Indicates whether the form is currently in a loading state.
	 * @type {boolean}
	 * @default false
	 */
	export let loading: boolean = false;

	type FormData = {
		[key: string]: string;
	};

	let formData: FormData = inputs.reduce(
		(acc: FormData, curr) => ({ ...acc, [curr.name]: '' }),
		{}
	);

    /**
     * Handles input change events.
     * @param {Event} event - The input change event.
     * @param {string} name - The name of the input field.
     */
	function handleInput(event: any, name: string) {
		formData[name] = event.target.value;
		if (inputErrors[name]) {
			inputErrors[name] = undefined;
		}
	}

    /**
     * Submits the form data.
     */
	function submit() {
		dispatch('submit', { formData });
	}
</script>

<div class="flex min-h-screen items-center justify-center">
	<div>
		<h2
			class="h2 m-5 bg-gradient-to-br from-primary-400 to-primary-800 bg-clip-text text-center font-bold text-transparent"
		>
			{title}
		</h2>
		<form on:submit|preventDefault={submit} class="space-y-4">
			{#each inputs as input (input.name)}
				<div>
					<label class="label">
						<span>{input.label}</span>
						<input
							value={formData[input.name]}
							on:input={(event) => handleInput(event, input.name)}
							class={`input mt-1 px-3 py-2 ${inputErrors[input.name] ? 'input-error' : ''}`}
							type={input.type}
							placeholder={input.placeholder}
						/>
						{#if inputErrors[input.name]}
							<p class="text-error-500">{inputErrors[input.name]}</p>
						{/if}
					</label>
				</div>
			{/each}
			<button
				type="submit"
				class={`btn ${errorMessage ? 'bg-error-500 hover:bg-error-600' : 'variant-filled-primary'}`}
				disabled={loading}
			>
				{#if loading}
					<ProgressRadial width="w-8" track="stroke-primary-500/30" />
				{:else}
					{errorMessage ? $t('tryAgain') : buttonText}
				{/if}
			</button>
			{#if errorMessage}
				<h5 class=" h5 mt-4 text-center text-error-500">{errorMessage}</h5>
			{/if}
		</form>
	</div>
</div>
