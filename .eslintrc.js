module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    NodeRequire: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'warn',
    semi: [0],
    quotes: [1, 'single'],
    'space-before-function-paren': 0
  }
}
