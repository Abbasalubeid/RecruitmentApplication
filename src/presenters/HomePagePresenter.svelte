<script lang="ts">
	/**
	 * HomePagePresenter Component
	 * Responsible for fetching the current user's data from the userStore and rendering the UserInfoView with the user's details.
	 */

	import { onMount } from 'svelte';
	import { userStore } from '$lib/stores/UserStore';
	import type { Person } from '../models/Person';
	import UserInfoView from '../views/UserInfoView.svelte';

	let person: Person | null = null;

	/**
	 * onMount Lifecycle Hook
	 *
	 * Subscribes to the userStore to obtain the current user's data upon component mount.
	 */
	onMount(() => {
		userStore.subscribe((userData) => {
			person = userData;
		});
	});
</script>

{#if person}
	<UserInfoView
		fullName={person.getFullName()}
		role={person.role.name}
		username={person.username}
	/>
{/if}
