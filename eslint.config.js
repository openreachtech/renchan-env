'use strict'

const configurations = require('@openreachtech/eslint-config')

module.exports = [
  /*
   * If ignores is used without any other keys in the configuration object, then the patterns act as global ignores. Here’s an example:
   *
   * https://eslint.org/docs/latest/use/configure/configuration-files#globally-ignoring-files-with-ignores
   */
  {
    ignores: [
      'index.mjs',
      'scripts/env.mjs',
    ],
  },

  ...configurations,

  {
    rules: {
      'camelcase': 'off',
      'id-length': 'off',
      'no-console': 'off',
      'no-dupe-keys': 'off',
      'no-else-return': 'off',
      'no-invalid-this': 'off',
      'no-nested-ternary': 'off',
      'no-param-reassign': 'off',
      'no-plusplus': 'off',
      'no-restricted-syntax': 'off',
      'no-return-await': 'off',
      'no-sequences': 'off',
      'no-shadow': 'off',
      'no-undef': 'off',
      'no-unexpected-multiline': 'off',
      'no-unneeded-ternary': 'off',
      'no-unreachable': 'off',
      'no-unused-vars': 'off',
      'no-useless-return': 'off',
      'no-var': 'off',
      'operator-assignment': 'off',
      'require-unicode-regexp': 'off',

      '@stylistic/arrow-parens': 'off',
      '@stylistic/brace-style': 'off',
      '@stylistic/comma-dangle': 'off',
      '@stylistic/comma-style': 'off',
      '@stylistic/eol-last': 'off',
      '@stylistic/indent': 'off',
      '@stylistic/max-statements-per-line': 'off',
      '@stylistic/multiline-ternary': 'off',
      '@stylistic/newline-per-chained-call': 'off',
      '@stylistic/no-whitespace-before-property': 'off',
      '@stylistic/operator-linebreak': 'off',
      '@stylistic/padded-blocks': 'off',
      '@stylistic/padding-line-between-statements': 'off',
      '@stylistic/quote-props': 'off',
      '@stylistic/semi': 'off',
      '@stylistic/semi-spacing': 'off',
      '@stylistic/semi-style': 'off',
      '@stylistic/space-before-blocks': 'off',
      '@stylistic/space-before-function-paren': 'off',
      '@stylistic/space-infix-ops': 'off',
      '@stylistic/spaced-comment': 'off',

      'jest/no-alias-methods': 'off',
      'jest/no-conditional-in-test': 'off',
      'jest/require-top-level-describe': 'off',

      'jsdoc/check-tag-names': 'off',
      'jsdoc/check-types': 'off',
      'jsdoc/no-bad-blocks': 'off',
      'jsdoc/no-blank-block-descriptions': 'off',
      'jsdoc/require-jsdoc': 'off',
      'jsdoc/tag-lines': 'off',

      'openreachtech/newline-per-parameter': 'off',
    },
  }
]
