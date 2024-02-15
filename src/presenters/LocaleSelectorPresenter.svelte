<script lang="ts">
	/**
	 * Presenter component for locale selection.
	 * This component utilizes the `DropDownView` to render a dropdown menu for locale selection
	 * It dynamically generates a selection dropdown based on the available locales defined in the `localeConfig.ts`.
	 * Changes to the selected locale are handled and propagated to the `svelte-i18n` library to update the application's locale.
	 *
	 */

	import { locale } from 'svelte-i18n';
	import DropDownView from '../views/DropDownView.svelte';
	import { locales } from '$lib/locales/localeConfig';

	let selectedLocale = 'en';

	// Generates an array of available locales for the selection dropdown
	const availableLocales = Object.keys(locales).map((value) => ({
		value,
		label: value.toUpperCase()
	}));

	/**
	 * Handles changes in the selected locale via the DropDownView component.
	 * Updates the application-wide locale setting to reflect the user's selection,
	 * which in turn triggers the re-rendering of localized text across the application.
	 *
	 * @function handleLocaleChange
	 * @param {string} selectedValue - The locale key corresponding to the user's selection.
	 */
	function handleLocaleChange(selectedValue: string): void {
		locale.set(selectedValue);
		selectedLocale = selectedValue;
	}
</script>

<div class="absolute right-0 top-0 m-4">
	<DropDownView
		selectedOption={selectedLocale}
		options={availableLocales}
		on:onLangSelect={(e) => handleLocaleChange(e.detail)}
	/>
</div>
