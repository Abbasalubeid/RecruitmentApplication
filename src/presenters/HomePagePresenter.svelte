<script lang="ts">
	/**
	 * HomePagePresenter Component
	 * This component is responsible for determining the user's authentication state and rendering
	 * either the UserInfoView with the user's details if they are logged in, or the LoginPromptView
	 */

	import LoginPromptView from './../views/LoginPromptView.svelte';
	import UserInfoView from '../views/UserInfoView.svelte';
	import LoadingView from '../views/LoadingView.svelte';
	import { onMount } from 'svelte';
	import type { Person } from '../models/Person';
	import { userStore } from '$lib/stores/userStore';

	let person: Person | null = null;
	let loading = true;

	/**
	 * onMount Lifecycle Hook
	 *
	 * Subscribes to the userStore to obtain the current user's data upon component mount.
	 */
	onMount(() => {
		userStore.subscribe((userData) => {
			person = userData;
			loading = false;
		});
	});
</script>

{#if loading}
	<LoadingView />
{:else if person}
	<UserInfoView
		fullName={person.getFullName()}
		role={person.role?.name}
		username={person.username}
	/>
{:else}
	<LoginPromptView />
{/if}
