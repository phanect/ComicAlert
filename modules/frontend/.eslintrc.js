"use strict";

module.exports = {
  extends: [
    "plugin:nuxt/recommended",
    "plugin:@phanect/vue",
  ],
  env: {
    browser: true,
    node: false,
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
