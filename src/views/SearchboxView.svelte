<script lang="ts">
	import { InputChip } from '@skeletonlabs/skeleton';
	import { t } from 'svelte-i18n';

	export let onAdd: (meta:any) => void = () => {
        console.warn("No action provided");
    };
	export let onRemove: (meta:any) => void = () => {
        console.warn("No action provided");
    };
	export let list: string[] = [];
</script>

<InputChip
	class="mx-auto w-1/4"
	on:add={onAdd}
	on:remove={onRemove}
	bind:value={list}
	name="chips"
	placeholder={$t("Filter table search")}
/>
