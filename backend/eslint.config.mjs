import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import drizzlePlugin from 'eslint-plugin-drizzle'
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths'

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [pluginJs.configs.recommended, ...tseslint.configs.recommended, eslintConfigPrettier],
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
    },
    plugins: {
      'drizzle-plugin': drizzlePlugin,
      'no-relative-import-paths': noRelativeImportPaths,
    },
    rules: {
      ...drizzlePlugin.recommended,
      'no-console': 'warn', // Warns on console.log usage
      '@typescript-eslint/no-explicit-any': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Warns when declared variables are not used
      'no-relative-import-paths/no-relative-import-paths': [
        'warn',
        { allowSameFolder: true, rootDir: 'src', prefix: '@' },
      ],
    },
  }
)
