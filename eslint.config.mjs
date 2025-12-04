import js from '@eslint/js';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  // что игнорируем
  {
    ignores: ['dist/**', 'node_modules/**'],
  },

  // основная конфигурация для src
  {
    files: ['src/**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      // базовые правила JS
      ...js.configs.recommended.rules,
      // TypeScript-рекомендации
      ...tsPlugin.configs.recommended.rules,
      // React + хуки
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      // отключаем конфликтующие с Prettier правила
      ...prettierConfig.rules,

      // мелкие правки под наш проект
      'react/react-in-jsx-scope': 'off',
      'prettier/prettier': 'warn',
    },
  },
];
