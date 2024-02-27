<script lang="ts">
	/**
	 * Presenter component for locale selection.
	 * This component utilizes the `DropDownView` to render a dropdown menu for locale selection
	 * It dynamically generates a selection dropdown based on the available locales defined in the `localeConfig.ts`.
	 *
	 * The application's locale is updated based on the 'lang' query parameter in the URL.
	 *
	 */
	import DropDownView from '../views/DropDownView.svelte';
	import { locales } from '$lib/locales/localeConfig';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';

	// Derive the language from the URL query parameters
	const lang = derived(page, ($page) => $page.url.searchParams.get('lang') || 'en');

	let selectedLocale: string;

	$: selectedLocale = $lang;

	// Generates an array of available locales for the selection dropdown
	const availableLocales = Object.keys(locales).map((value) => ({
		value,
		label: value.toUpperCase()
	}));

	/**
	 * Handles changes in the selected locale via the DropDownView component.
	 * Updates the URL's query parameters to reflect the user's selection,
	 * which in turn updates the application's locale accordingly.
	 *
	 * @function handleLocaleChange
	 * @param {string} selectedValue - The locale key corresponding to the user's selection.
	 */
	function handleLocaleChange(selectedValue: string): void {
		const url = new URL(window.location.href);
		url.searchParams.set('lang', selectedValue);

		goto(url.toString(), { replaceState: true });
	}
</script>

<DropDownView
	selectedOption={selectedLocale}
	options={availableLocales}
	on:onLangSelect={(e) => handleLocaleChange(e.detail)}
/>
