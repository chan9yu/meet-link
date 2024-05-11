/** @type {import("eslint").Linter.Config} */
module.exports = {
	root: true,
	env: {
		node: true,
		jest: true
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2022,
		sourceType: 'module'
	},
	extends: [
		'prettier', //
		'eslint:recommended',
		'plugin:prettier/recommended',
		'plugin:@typescript-eslint/recommended'
	],
	plugins: ['@typescript-eslint/eslint-plugin'],
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-unused-vars': 'warn',
		'no-unused-vars': 'warn'
	}
};
