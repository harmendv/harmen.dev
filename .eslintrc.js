module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/recommended', '@vue/eslint-config-airbnb'],
  rules: {
    'no-console': process.env.NODE_ENV === 'development' ? 'off' : 'error',
    'no-debugger': process.env.NODE_ENV === 'development' ? 'off' : 'error',
    'no-unused-vars': process.env.NODE_ENV === 'development' ? 'warn' : 'error',
    'max-len': process.env.NODE_ENV === 'development' ? 'warn' : 'error',
    'no-restricted-syntax': 0,
    'global-require': 0,
    'import/no-dynamic-require': 0,
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    'class-methods-use-this': 0,
    'func-names': ['error', 'as-needed'],
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
};
