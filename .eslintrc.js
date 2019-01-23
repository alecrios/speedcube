module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'plugin:vue/essential',
		'@vue/airbnb',
	],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'indent': ['error', 'tab'],
		'no-tabs': 0,
		'quote-props': ['warn', 'consistent'],
		'arrow-parens': ['warn', 'always'],
		'no-unused-expressions': [2, {'allowTernary': true}],
		'no-confusing-arrow': ['error', {'allowParens': true}],
		'object-curly-spacing': ['warn', 'never'],
		'object-curly-newline': ['warn', {
			'ObjectExpression': {'multiline': true, 'consistent': true},
			'ObjectPattern': {'multiline': true, 'consistent': true},
			'ImportDeclaration': {'multiline': true, 'consistent': true},
			'ExportDeclaration': {'multiline': true, 'consistent': true}
		}],
		'no-param-reassign': ['error', {
			props: true,
			ignorePropertyModificationsFor: ['state'],
		}],
	},
	parserOptions: {
		parser: 'babel-eslint',
	},
};
