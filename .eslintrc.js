"use strict"

module.exports = {
  extends: "plugin:@phanect/js",
  root: true,
  env: {
    "node": true
  },
  parserOptions: {
    project: "./tsconfig.json",
    sourceType: "module",
  },
  plugins: [ "@phanect" ],
};
