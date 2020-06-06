module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-underscore-dangle': [2, { allow: ['_id'] }],
    'eslint consistent-return': false,
    'no-console': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
