import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'
import prettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      eslintConfigPrettier,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
        '@typescript-eslint': tseslint.plugin,
        prettier,
    },
    rules: {
        'semi': ['warn', 'always'],
        'quotes': ['warn', 'single'],
        'indent': ['warn', 4],
        'no-multiple-empty-lines': ['warn', { max: 1 }],
        'camelcase': 'warn',
        'prefer-const': 'warn',
        'curly': ['warn', 'multi'],
        'object-curly-spacing': ['warn', 'always'],
        'no-unused-vars': 'warn',
        'no-console': 'warn',
        'eqeqeq': ['warn', 'always'],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_'}],
        '@typescript-eslint/explicit-function-return-type': 'off',
    }
  },
])
