<script lang="ts">
	import { Table } from '@skeletonlabs/skeleton';

	/**
	 * Props for the table headers and body data. These are passed in by a parent
	 * component (presenter) and used to populate the table.
	 */
	export let head: string[] = [];
	export let body: any[][] = [];

	$: tableSource = { head, body };
</script>

<Table source={tableSource} />
