const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/*
 * This is a custom ESLint configuration for use with
 * internal (bundled by their consumer) libraries
 * that utilize React.
 */

/** @type {import("eslint").Linter.Config} */
module.exports = {
  globals: {
    React: true,
    JSX: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    // Ignore dotfiles
    '.*.js',
    'node_modules/',
    'dist/',
  ],

  env: {
    browser: true,
    es2021: true,
  },

  extends: [
    'react-app',
    'prettier',
    'plugin:react/recommended',
    'eslint:recommended',
    'standard',
    'plugin:prettier/recommended',
    'plugin:cypress/recommended',
    'eslint-config-turbo',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 'off',
    'no-console': 'warn',
  },
  overrides: [
    {
      files: ['*.js?(x)', '*.ts?(x)'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      rules: {
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['off'],
        camelcase: 'warn',
      },
    },
  ],
};
