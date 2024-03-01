<script lang="ts">
	import { Paginator } from '@skeletonlabs/skeleton';
	import TableView from './TableView.svelte';

	export let classSetting: string;
	export let interactive: boolean;
	export let head: string[] = [];
	export let body: any[][] = [];
	export let settings: any;
	export let showFirstLastButtons: boolean;
	export let showPreviousNextButtons: boolean;

	export let onPageinatorChange: () => void = () => {
        console.warn("No action provided");
    };
	export let onSelectedTable: (meta:any) => void = () => {
        console.warn("No action provided");
    };
</script>

<TableView {classSetting} {onSelectedTable} {interactive} {head} {body} />

<Paginator
	on:amount={onPageinatorChange}
	on:page={onPageinatorChange}
	class={classSetting}
	bind:settings
	{showFirstLastButtons}
	{showPreviousNextButtons}
/>
