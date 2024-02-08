<script lang="ts">
	import { Table } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';

	/**
	 * Props for the table headers and body data. These are passed in by a parent
	 * component (presenter) and used to populate the table.
	 */
	export let head: string[] = [];
	export let body: any[][] = [];

	let tableSource: TableSource = { head, body };
</script>

<Table source={tableSource} />
