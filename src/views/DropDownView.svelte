<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let selectedOption: string;
	export let options: { value: string; label: string }[];

	const dispatch = createEventDispatcher();

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
