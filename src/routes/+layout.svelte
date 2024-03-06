<script lang="ts">
	import NavbarPresenter from './../presenters/NavbarPresenter.svelte';
	import '../app.pcss';
	import LocaleSelectorPresenter from '../presenters/LocaleSelectorPresenter.svelte';

	/**
	 * The root layout component that wraps around every page of the application.
	 * This layout ensures these elements are consistently present across all pages
	 */
</script>

<div class="absolute right-0 top-0 m-4">
	<LocaleSelectorPresenter />
</div>

<NavbarPresenter />

<slot />
