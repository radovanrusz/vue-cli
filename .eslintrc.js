module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/prefer-default-export': 'off',
    'linebreak-style': 0,
    'global-require': 0,
    'eslint linebreak-style': [0, 'error', 'windows'],
    'allowForLoopAfterthoughts': true,
    'no-plusplus': 'off',
    'class-methods-use-this': 'off',
    'quotes': 'off',
    'max-len': 'off',
    'comma-dangle': ['error', 'never'],
    'no-param-reassign': ['error', { 'props': true, 'ignorePropertyModificationsFor': ['state'] }],
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
};