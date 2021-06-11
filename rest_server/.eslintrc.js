module.exports = {
  plugins: ['eslint-plugin-prettier'],
  env: {
    node: true,
    es6: true,
  },
  extends: ['standard', 'plugin:prettier/recommended', 'prettier'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': ['error'],
    'max-len': [
      'error',
      {
        code: 120,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
  },
};
