/**
 * Configuration module for application locales.
 * Manually imports JSON files for each supported locale and exports them as a single object.
 *
 * @module localeConfig
 */

import en from './en.json';
import sv from './sv.json';
import ar from './ar.json';
// Import additional locales as you add them

/**
 * An object mapping locale keys to their respective imported messages.
 * Each key corresponds to a locale identifier (e.g., 'en' for English), and the value is the imported JSON messages for that locale.
 */
export const locales = {
	en: en,
	sv: sv,
	ar: ar
	// Add additional locales here
};
