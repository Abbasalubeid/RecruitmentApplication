<script lang="ts">
	import { page } from '$app/stores';
	import { LightSwitch } from '@skeletonlabs/skeleton';

	// Props received from the parent component: the list of navbar items and the loading state.
	export let navbarItems: { label: string; action: () => void; path: string | null }[];
	export let isLoading: boolean;

	/**
	 * Handles navbar item click events. Executes the item's action if not in a loading state.
	 * @param {Function} action - The action to perform on item click.
	 */
	const handleItemClick = (action: () => void) => {
		if (!isLoading) {
			action();
		}
	};
</script>

<nav class="p-2">
	<ul class="m-1 flex list-none">
		<li class="mr-4">
			<div class="inline-block cursor-pointer rounded-full border-2 border-primary-500 p-2">
				<LightSwitch />
			</div>
		</li>
		{#each navbarItems as { label, action, path }}
			<li class="mr-4">
				<button
					on:click={() => handleItemClick(action)}
					disabled={isLoading}
					class="inline-block cursor-pointer rounded-full px-4 py-2
                             {path === $page.url.pathname
						? 'bg-primary-500'
						: 'border-2 border-primary-500 bg-transparent hover:bg-primary-500'}
                             disabled:cursor-not-allowed disabled:opacity-50"
				>
					{label}
				</button>
			</li>
		{/each}
	</ul>
</nav>
