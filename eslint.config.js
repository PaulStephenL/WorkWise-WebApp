import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist'] ***REMOVED***,
  {
    files: ['**/*.{js,jsx***REMOVED***'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    ***REMOVED***,
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    ***REMOVED***,
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true ***REMOVED***,
      ],
    ***REMOVED***,
  ***REMOVED***
];