<script lang="ts">
	export let message: string;
</script>

{#if message}
	<aside class="alert variant-ghost border border-red-400 bg-red-100 text-red-700">
		<div class="alert-message">
			<h3 class="text-lg font-semibold">Error</h3>
			<p>{message}</p>
		</div>
	</aside>
{/if}
