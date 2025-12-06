const js = require('@eslint/js');
const globals = require('globals');
const { defineConfig } = require('eslint/config');

module.exports = defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      'eol-last': 'warn',
      'comma-dangle': ['warn', 'always-multiline'],
      semi: ['error', 'always'],
      quotes: ['warn', 'single'],
    },
    ignores: ['docs/', 'docs/assets/main.bundle.js'],
  },
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs' },
  },
]);
