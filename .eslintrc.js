"use strict"

module.exports = {
  extends: "plugin:@phanect/js",
  root: true,
  env: {
    "node": true
  },
  parserOptions: {
    sourceType: "module",
  },
  plugins: [ "@phanect" ],
};
