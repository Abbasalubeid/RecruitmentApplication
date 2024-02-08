<script lang="ts">
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	export let message: string = 'Loading...';
</script>

<div class="flex flex-col items-center">
	<div>
		<ProgressRadial value={undefined} />
	</div>
	<p class="mt-2">{message}</p>
</div>
