module.exports = {
	'env': {
		'node': true,
		'es6': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended'
	],
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly',
		"localStorage": true,
		"document": true,
		"alert": true
	},
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 2018,
		'sourceType': 'module'
	},
	'plugins': [
		'react'
	],
	"settings": {
		"react": {
			"version": "detect"
		}
	},
	'rules': {
		'no-var': 'error',
		'brace-style': 'error',
		'prefer-template': 'error',
		radix: 'error',
		'space-before-blocks': 'error',
		'import/prefer-default-export': 'off',
		'indent': [
			2,
			'tab'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		],
		'prefer-arrow-callback': [ "error", { "allowNamedFunctions": false } ],
		'react/prop-types': 'off'
	},
	overrides: [
		{
			files: [
				'**/*.test.js',
				'**/*.test.jsx',
				'**/*.test.tsx',
				'**/*.spec.js',
				'**/*.spec.jsx',
				'**/*.spec.tsx',
			],
			env: {
				jest: true,
			},
		},
	],
}