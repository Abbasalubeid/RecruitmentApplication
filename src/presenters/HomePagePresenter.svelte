<script lang="ts">
	import LoginPromptView from './../views/LoginPromptView.svelte';
	/**
	 * HomePagePresenter Component
	 * Responsible for fetching the current user's data from the userStore and rendering the UserInfoView with the user's details.
	 */

	import { onMount } from 'svelte';
	import { userStore } from '$lib/stores/UserStore';
	import type { Person } from '../models/Person';
	import UserInfoView from '../views/UserInfoView.svelte';
	import LoadingView from '../views/LoadingView.svelte';

	import { goto } from '$app/navigation';

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

	/**
	 * Handles navigation to the login page.
	 * If present, preserves the 'lang' query parameter to maintain language preference across navigation.
	 */
	function handleLoginRequest() {
		const queryParams = new URLSearchParams(window.location.search);
		const lang = queryParams.get('lang');
		goto(`/login?${lang ? `lang=${lang}` : ''}`);
	}
</script>

{#if loading}
	<LoadingView />
{:else if person}
	<UserInfoView
		fullName={person.getFullName()}
		role={person.role.name}
		username={person.username}
	/>
{:else}
	<LoginPromptView on:requestLogin={handleLoginRequest} />
{/if}
