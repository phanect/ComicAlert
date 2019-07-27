"use strict";

module.exports = {
  extends: "plugin:@phanect/ts",

  env: {
    browser: false,
    node: true,
  },
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "editorconfig/editorconfig": "off", // Currently TypeScript is unsupported
  },
};
