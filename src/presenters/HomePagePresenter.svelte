<script lang="ts">
	/**
	 * HomePagePresenter Component
	 * This component is responsible for determining the user's authentication state and rendering
	 * either the UserInfoView with the user's details if they are logged in, or the LoginPromptView
	 * to allow the user to log in. It also displays a loading state while the user's information is being fetched.
	 */

	import LoginPromptView from './../views/LoginPromptView.svelte';
	import UserInfoView from '../views/UserInfoView.svelte';
	import LoadingView from '../views/LoadingView.svelte';
	import { navigateWithQuery } from '$lib/util/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let currentUser: any = null;
	let loading = true;

	onMount(async () => {
		if ($page.data.user) {
			currentUser = $page.data.user;
			loading = false;
		} else {
			currentUser = null;
			loading = false;
		}
	});

	/**
	 * Handles navigation to the login page.
	 * If present, preserves the 'lang' query parameter to maintain language preference across navigation.
	 */
	function handleLoginRequest() {
		navigateWithQuery(`/login`);
	}
</script>

{#if loading}
	<LoadingView />
{:else if currentUser}
	<UserInfoView name={currentUser.name} role={currentUser.role} username={currentUser.username} />
{:else}
	<LoginPromptView on:requestLogin={handleLoginRequest} />
{/if}
