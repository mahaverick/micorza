/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  endOfLine: 'lf',
  trailingComma: 'es5',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  printWidth: 100,
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  importOrder: [
    '^(react/(.*)$)|^(react$)',
    '^(react-dom/(.*)$)|^(react-dom$)',
    '^(react-redux/(.*)$)|^(react-redux$)',
    '^(react-router-dom/(.*)$)|^(react-router-dom$)',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '<BUILTIN_MODULES>',
    '',
    '^types$',
    '^@/types/(.*)$',
    '^@/services/(.*)$',
    '^@/contexts/(.*)$',
    '',
    '^@/router/(.*)$',
    '^@/redux/(.*)$',
    '^@/configs/(.*)$',
    '^@/utils/(.*)$',
    '^@/hooks/(.*)$',
    '',
    '^@/(.*)$',
    '^@/components/ui/(.*)$',
    '^@/components/(.*)$',
    '^@/pages/(.*)$',
    '^@/assets/(.*)$',
    '^@/styles/(.*)$',
    '',
    '^[./]',
  ],
  plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
}

export default config
