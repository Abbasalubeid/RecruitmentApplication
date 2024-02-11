<script lang="ts">
	import { page } from '$app/stores';
	import ErrorView from '../views/ErrorView.svelte';

	let errorMessage = $page.error?.message || 'An unexpected error occurred';
	let errorStatus = $page.status || 500;
</script>

<ErrorView {errorMessage} {errorStatus}></ErrorView>
