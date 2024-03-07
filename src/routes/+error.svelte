<script lang="ts">
	import { page } from '$app/stores';
	import StatusView from '../views/StatusView.svelte';

	let errorMessage = $page.error?.message || 'An unexpected error occurred';
	let errorStatus = $page.status || 500;

	/**
	 * The error page component that is rendered whenever an unhandled error occurs
	 * during page rendering.
	 */
</script>

<StatusView message={errorMessage} statusNumber={errorStatus} viewType="error" />
