<script lang="ts">
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	export let message: string = ' ';

	$: displayedMessage = message;
</script>

<div class="flex flex-col items-center">
	<div>
		<ProgressRadial value={undefined} />
	</div>
	<p class="mt-2">{displayedMessage}</p>
</div>
