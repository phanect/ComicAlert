"use strict"

module.exports = {
  extends: "plugin:@phanect/plain",
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
