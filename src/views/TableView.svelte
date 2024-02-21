<script lang="ts">
	import { Table } from '@skeletonlabs/skeleton';

	/**
	 * Props for the table headers and body data. These are passed in by a parent
	 * component (presenter) and used to populate the table.
	 */
	export let classSetting: string;
	export let interactive: boolean;
	export let head: string[] = [];
	export let body: any[][] = [];

	export let onSelectedTable: (meta:any) => void = () => {
        console.warn("No action provided");
    };

	$: tableSource = { head, body };
</script>

<Table class="{classSetting}" on:selected={onSelectedTable} {interactive} source={tableSource} />
