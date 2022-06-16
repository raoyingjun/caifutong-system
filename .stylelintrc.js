/*
 * .stylelintrc.js
 * 配置参考：https://stylelint.io/user-guide/configure/#stylelintignore
 */

module.exports = {
  defaultSeverity: 'error',
  plugins: ['stylelint-order'],
  extends: ['stylelint-config-standard', 'stylelint-config-rational-order'],
  ignoreFiles: [
    'src/assets/style/theme/**'
  ],
  rules: {
    'no-descending-specificity': null,
    'rule-empty-line-before': null,
    'declaration-block-trailing-semicolon': null,
    'declaration-empty-line-before': null,
    'number-leading-zero': null,
  },
};
