import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const customTheme: CustomThemeConfig = {
	name: 'custom-theme',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		'--theme-font-family-heading': `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '9999px',
		'--theme-rounded-container': '16px',
		'--theme-border-base': '2px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '255 255 255',
		'--on-secondary': '255 255 255',
		'--on-tertiary': '255 255 255',
		'--on-success': '255 255 255',
		'--on-warning': '255 255 255',
		'--on-error': '255 255 255',
		'--on-surface': '255 255 255',
		// =~= Theme Colors  =~=
		// primary | #0c78c4
		'--color-primary-50': '219 235 246', // #dbebf6
		'--color-primary-100': '206 228 243', // #cee4f3
		'--color-primary-200': '194 221 240', // #c2ddf0
		'--color-primary-300': '158 201 231', // #9ec9e7
		'--color-primary-400': '85 161 214', // #55a1d6
		'--color-primary-500': '12 120 196', // #0c78c4
		'--color-primary-600': '11 108 176', // #0b6cb0
		'--color-primary-700': '9 90 147', // #095a93
		'--color-primary-800': '7 72 118', // #074876
		'--color-primary-900': '6 59 96', // #063b60
		// secondary | #2575a1
		'--color-secondary-50': '222 234 241', // #deeaf1
		'--color-secondary-100': '211 227 236', // #d3e3ec
		'--color-secondary-200': '201 221 232', // #c9dde8
		'--color-secondary-300': '168 200 217', // #a8c8d9
		'--color-secondary-400': '102 158 189', // #669ebd
		'--color-secondary-500': '37 117 161', // #2575a1
		'--color-secondary-600': '33 105 145', // #216991
		'--color-secondary-700': '28 88 121', // #1c5879
		'--color-secondary-800': '22 70 97', // #164661
		'--color-secondary-900': '18 57 79', // #12394f
		// tertiary | #3a8cb8
		'--color-tertiary-50': '225 238 244', // #e1eef4
		'--color-tertiary-100': '216 232 241', // #d8e8f1
		'--color-tertiary-200': '206 226 237', // #cee2ed
		'--color-tertiary-300': '176 209 227', // #b0d1e3
		'--color-tertiary-400': '117 175 205', // #75afcd
		'--color-tertiary-500': '58 140 184', // #3a8cb8
		'--color-tertiary-600': '52 126 166', // #347ea6
		'--color-tertiary-700': '44 105 138', // #2c698a
		'--color-tertiary-800': '35 84 110', // #23546e
		'--color-tertiary-900': '28 69 90', // #1c455a
		// success | #4CAF50
		'--color-success-50': '228 243 229', // #e4f3e5
		'--color-success-100': '219 239 220', // #dbefdc
		'--color-success-200': '210 235 211', // #d2ebd3
		'--color-success-300': '183 223 185', // #b7dfb9
		'--color-success-400': '130 199 133', // #82c785
		'--color-success-500': '76 175 80', // #4CAF50
		'--color-success-600': '68 158 72', // #449e48
		'--color-success-700': '57 131 60', // #39833c
		'--color-success-800': '46 105 48', // #2e6930
		'--color-success-900': '37 86 39', // #255627
		// warning | #FF9800
		'--color-warning-50': '255 240 217', // #fff0d9
		'--color-warning-100': '255 234 204', // #ffeacc
		'--color-warning-200': '255 229 191', // #ffe5bf
		'--color-warning-300': '255 214 153', // #ffd699
		'--color-warning-400': '255 183 77', // #ffb74d
		'--color-warning-500': '255 152 0', // #FF9800
		'--color-warning-600': '230 137 0', // #e68900
		'--color-warning-700': '191 114 0', // #bf7200
		'--color-warning-800': '153 91 0', // #995b00
		'--color-warning-900': '125 74 0', // #7d4a00
		// error | #F44336
		'--color-error-50': '253 227 225', // #fde3e1
		'--color-error-100': '253 217 215', // #fdd9d7
		'--color-error-200': '252 208 205', // #fcd0cd
		'--color-error-300': '251 180 175', // #fbb4af
		'--color-error-400': '247 123 114', // #f77b72
		'--color-error-500': '244 67 54', // #F44336
		'--color-error-600': '220 60 49', // #dc3c31
		'--color-error-700': '183 50 41', // #b73229
		'--color-error-800': '146 40 32', // #922820
		'--color-error-900': '120 33 26', // #78211a
		// surface | #1E1E1E
		'--color-surface-50': '221 221 221', // #dddddd
		'--color-surface-100': '210 210 210', // #d2d2d2
		'--color-surface-200': '199 199 199', // #c7c7c7
		'--color-surface-300': '165 165 165', // #a5a5a5
		'--color-surface-400': '98 98 98', // #626262
		'--color-surface-500': '30 30 30', // #1E1E1E
		'--color-surface-600': '27 27 27', // #1b1b1b
		'--color-surface-700': '23 23 23', // #171717
		'--color-surface-800': '18 18 18', // #121212
		'--color-surface-900': '15 15 15' // #0f0f0f
	}
};
