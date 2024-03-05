<script lang="ts">
	import { InputChip } from '@skeletonlabs/skeleton';
	import { t } from 'svelte-i18n';

	/**
     * Callback function invoked when a chip is added.
     * @type {(meta:any) => void}
     * @default () => { console.warn("No action provided"); }
     */
	 export let onAdd: (meta: any) => void = () => {
        console.warn("No action provided");
    };

    /**
     * Callback function invoked when a chip is removed.
     * @type {(meta:any) => void}
     * @default () => { console.warn("No action provided"); }
     */
    export let onRemove: (meta: any) => void = () => {
        console.warn("No action provided");
    };

    /**
     * List of strings representing the filter chips.
     * @type {string[]}
     */
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
