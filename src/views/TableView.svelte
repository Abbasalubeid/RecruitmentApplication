<script lang="ts">
  import { Table } from '@skeletonlabs/skeleton';
  import type { TableSource } from '@skeletonlabs/skeleton';

  export let head: string[] = [];
  export let body: any[][] = [];

  let tableSource: TableSource = { head, body};
</script>

<Table source={tableSource} />
