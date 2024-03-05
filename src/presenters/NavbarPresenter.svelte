<script lang="ts">
	import NavbarView from '../views/NavbarView.svelte';
	import { t } from 'svelte-i18n';
	import { userStore } from '$lib/stores/userStore';
	import type { Person } from '../models/Person';
	import { navigateWithQuery } from '$lib/util/navigation';
	import { ErrorHandler } from '$lib/util/errorHandler';

	/**
	 * The `NavbarPresenter` acts as the mediator between the user's authentication state and the navbar's view.
	 * It dynamically constructs the navbar items based on the user's role and authentication status, handling actions like navigation and logout.
	 */

	let isLoading = false;
	let currentUser: Person | null = null;
	let navbarItems: { label: string; action: () => void; path: string | null }[];

	userStore.subscribe((userData) => {
		currentUser = userData;
	});

	/**
	 * Initiates the user logout process. It makes a request to the logout endpoint, clears the user store, and navigates to the homepage upon success.
	 */
	async function logout() {
		isLoading = true;
		try {
			const response = await fetch('/api/auth/logout', {
				method: 'POST',
				credentials: 'include'
			});
			if (response.ok) {
				userStore.clearUser();
				navigateWithQuery('/');
			}
		} catch (error) {
			ErrorHandler.handleLogoutError(error as Error);
		} finally {
			isLoading = false;
		}
	}

	// Reactive block to construct navbar items based on the current user's role and authentication status
	$: {
		navbarItems = [{ label: $t('home'), action: () => navigateWithQuery('/'), path: '/' }];

		if (currentUser) {
			const userRole = currentUser?.role?.name ?? '';

			if (userRole === 'recruiter') {
				navbarItems.push({
					label: $t('applications'),
					action: () => navigateWithQuery('/applications'),
					path: '/applications'
				});
			}
			if (userRole === 'applicant') {
				navbarItems.push({
					label: $t('apply'),
					action: () => navigateWithQuery('/apply'),
					path: '/apply'
				});
			}

			navbarItems.push({ label: $t('logout'), action: logout, path: null });
		}
	}
</script>

<NavbarView {navbarItems} {isLoading} />
