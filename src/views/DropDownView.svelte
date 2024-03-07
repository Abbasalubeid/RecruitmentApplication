<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	/**
	 * The currently selected option.
	 * @type {string}
	 */
	export let selectedOption: string;

    /**
     * Array of options containing both value and label.
     * @type {{ value: string; label: string }[]}
     */
	export let options: { value: string; label: string }[];

	const dispatch = createEventDispatcher();

	/**
     * Handles the change event of the select element.
     * @param {Event} event - The change event object.
     */
	function handleChange(event: Event): void {
		const selectedValue = (event.target as HTMLSelectElement).value;
		dispatch('onLangSelect', selectedValue);
	}
</script>

<select
	class="cursor-pointer bg-secondary-500"
	bind:value={selectedOption}
	on:change={handleChange}
>
	{#each options as { value, label }}
		<option {value}>{label}</option>
	{/each}
</select>
