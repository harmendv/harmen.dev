<template>
  <div>
    <vue-code
      :code="code"
      language="js"
    />
  </div>
</template>

<script>
import VueCode from '@/components/VueCode.vue';

export default {
  components: {
    VueCode,
  },
  data() {
    return {
      code: `{
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/recommended', '@vue/eslint-config-airbnb'],
  rules: {
    'no-console': 'process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': 'process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': 'process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'max-len': 'process.env.NODE_ENV === 'production' ? 'error' : 'warn',
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
    parser: 'babel-eslint',
  },
  globals: {
    _: 'readonly',
  },
},`,
    };
  },
};
</script>
