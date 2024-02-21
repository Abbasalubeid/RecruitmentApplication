import { join } from 'path';
import type { Config } from 'tailwindcss';
import { customTheme } from './customTheme';

// 1. Import the Skeleton plugin
import { skeleton } from '@skeletonlabs/tw-plugin';

const config = {
	// 2. Opt for dark mode to be handled via the class method
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// 3. Append the path to the Skeleton package
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {}
	},
	plugins: [
		skeleton({
			themes: {
				custom: [customTheme],
				// Register each theme within this array:
				preset: ['skeleton', 'modern', 'wintry', 'crimson', 'vintage', 'gold-nouveau']
			}
		})
	]
} satisfies Config;

export default config;
