module.exports = {
  extends: [
    "plugin:nuxt/recommended",
    "plugin:@phanect/vue",
  ],
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    extraFileExtensions: [ ".vue" ],
    sourceType: "module",
  },
  plugins: [
    "@phanect",
    "nuxt",
  ],
};
