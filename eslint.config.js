// eslint.config.js
import eslint from 'eslint';
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';

export default [
  {
    ignores: [
      'eslint.config.js',
      'tsup.config.js',
      'node_modules/**',
      '.changeset/',
      '.vscode/',
      '.github/',
      'docs/',
      'dist/',
      'lib/',
    ],
  },
  {
    files: ['src/**/*.ts', 'src/**/*.js'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: {
        browser: true,
        node: true,
      },
    },
    plugins: {
      typescriptPlugin
    },
    rules: {
      '@/indent': ['error', 4],
      '@/quotes': ['error', 'double'],
      'no-await-in-loop': 'off'
    },
  },
];