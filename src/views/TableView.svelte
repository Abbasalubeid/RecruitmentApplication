<script lang="ts">
	import { Table } from '@skeletonlabs/skeleton';

	/**
     * CSS classes to be applied to the Table component.
     * @type {string}
     */
    export let classSetting: string;

    /**
     * Indicates if the Table component is interactive.
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
     * Callback function invoked when a table row is selected.
     * @type {(meta: any) => void}
     * @default () => { console.warn('No action provided'); }
     */
    export let onSelectedTable: (meta: any) => void = () => {
        console.warn('No action provided');
    };

	$: tableSource = { head, body };
</script>

<Table class={classSetting} on:selected={onSelectedTable} {interactive} source={tableSource} />
