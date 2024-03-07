<script lang="ts">
	import { page } from '$app/stores';
	import MigrationPresenter from '../../presenters/MigrationPresenter.svelte';

	const token = $page.url.searchParams.get("token")
</script>

<MigrationPresenter {token} />
