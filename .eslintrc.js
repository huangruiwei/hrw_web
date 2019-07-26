// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': 0,
    'generator-star-spacing': 'off',
    'indent': 0,
    'import/no-webpack-loader-syntax': 0,
    'space-before-function-paren': 0,
    'semi': [2, 'always'],
    'no-mixed-spaces-and-tabs': 0,
    'no-tabs': 0,
    'no-undef': 0,
    'new-cap': 0,
    'no-useless-escape': 0,
    'no-new': 0,
  }
}
