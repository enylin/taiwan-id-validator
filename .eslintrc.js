module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    indent: 'off',
    quotes: ['error', 'single'],
    'linebreak-style': ['error', 'unix'],
    semi: ['error', 'never'],
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error'
  }
}
