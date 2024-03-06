<script lang="ts">
	import { Paginator } from '@skeletonlabs/skeleton';
	import TableView from './TableView.svelte';

	/**
     * CSS classes to be applied to the component.
     * @type {string}
     */
	 export let classSetting: string;

	/**
	 * Indicates if the table should be interactive.
	 * @type {boolean}
	 */
	export let interactive: boolean;

	/**
	 * Array containing the headers of the table.
	 * @type {string[]}
	 */
	export let head: string[] = [];

	/**
	 * Array containing the body of the table.
	 * @type {any[][]}
	 */
	export let body: any[][] = [];

	/**
	 * Settings for the Paginator component.
	 * @type {any}
	 */
	export let settings: any;

	/**
	 * Indicates whether to show the first and last buttons on the paginator.
	 * @type {boolean}
	 */
	export let showFirstLastButtons: boolean;

	/**
	 * Indicates whether to show the previous and next buttons on the paginator.
	 * @type {boolean}
	 */
	export let showPreviousNextButtons: boolean;

	/**
	 * Callback function invoked when the paginator amount to show changes.
	 * @type {() => void}
	 * @default () => { console.warn("No action provided"); }
	 */
	export let onPageinatorAmountChange: (data:any) => void = () => {
		console.warn("No action provided");
	};

	/**
	 * Callback function invoked when the paginator page changes.
	 * @type {() => void}
	 * @default () => { console.warn("No action provided"); }
	 */
	 export let onPageinatorPageChange: () => void = () => {
		console.warn("No action provided");
	};

	/**
	 * Callback function invoked when a table is selected.
	 * @type {(meta:any) => void}
	 * @default () => { console.warn("No action provided"); }
	 */
	export let onSelectedTable: (meta: any) => void = () => {
		console.warn("No action provided");
	};
</script>

<TableView {classSetting} {onSelectedTable} {interactive} {head} {body} />

<Paginator
	on:amount={onPageinatorAmountChange}
	on:page={onPageinatorPageChange}
	class={classSetting}
	bind:settings
	{showFirstLastButtons}
	{showPreviousNextButtons}
/>
