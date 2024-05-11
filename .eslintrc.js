/** @type {import("eslint").Linter.Config} */
module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
		project: './tsconfig.eslint.json',
		tsconfigRootDir: __dirname
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.ts']
			}
		}
	},
	extends: [
		'prettier',
		'eslint:recommended',
		'plugin:import/recommended',
		'plugin:prettier/recommended',
		'plugin:@typescript-eslint/recommended'
	],
	plugins: ['@typescript-eslint']
};
