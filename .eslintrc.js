module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-var': 'error',
    'prefer-const': 'warn',
    'react/prop-types': 'off',
    'react/no-deprecated': 'off',
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto',
        semi: false,
      },
    ],
  },
};
