export default {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'lf',
        semi: true,
        singleQuote: true,
        printWidth: 120,
        tabWidth: 2,
        trailingComma: 'none'
      }
    ],
    'linebreak-style': ['error', 'unix']
  }
};
