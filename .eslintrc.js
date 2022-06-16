// eslint方案为公司级js + prettier

module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    extraFileExtensions: ['.vue'],
  },
  extends: ['@tencent/eslint-config-tencent', 'plugin:vue/vue3-recommended', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'error',
    'padding-line-between-statements': [
      1,
      { blankLine: 'always', prev: 'multiline-block-like', next: '*' },
      { blankLine: 'always', prev: 'function', next: '*' },
    ],
    'vue/multi-word-component-names': 'off',
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
  },
};
