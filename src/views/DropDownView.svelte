<!-- SelectView.svelte -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let selectedOption: string;
	export let options: { value: string; label: string }[];

	const dispatch = createEventDispatcher();

	function handleChange(event: Event): void {
		const selectedValue = (event.target as HTMLSelectElement).value;
		dispatch('change', selectedValue);
	}
</script>

<select
	class="rounded-full border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500"
	bind:value={selectedOption}
	on:change={handleChange}
>
	{#each options as { value, label }}
		<option {value}>{label}</option>
	{/each}
</select>
