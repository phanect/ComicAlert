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
    extraFileExtensions: [ ".ts", ".vue" ],
    project: "./tsconfig.json",
    sourceType: "module",
  },
  plugins: [
    "@phanect",
    "nuxt",
  ],
};
