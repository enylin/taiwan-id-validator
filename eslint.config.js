import js from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['coverage/**', 'dist/**']
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'no-duplicate-imports': ['error', { allowSeparateTypeImports: true }]
    }
  }
)
