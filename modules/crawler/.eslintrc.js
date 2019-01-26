module.exports = {
  "parserOptions": {
    // Specifying here due to issue on eslint-plugin-vue
    // @see: https://github.com/vuejs/eslint-plugin-vue#what-is-the-use-the-latest-vue-eslint-parser-error
    parser: "typescript-eslint-parser",
  },
  plugins: [ "typescript" ],
  rules: {
    // Temporary disabled due to known bug for typescript-eslint-parser:
    // https://github.com/eslint/typescript-eslint-parser/issues/416
    "no-undef": "off",
  }
};
