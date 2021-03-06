module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: ['plugin:react/recommended'],
  plugins: ['react-hooks'],
  // add your custom rules here
  rules: {
    'react/prop-types': 0,
    'no-console': 2,
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
  },
}
