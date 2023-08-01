"use strict"

module.exports = {
  extends: "phanective/node",
  root: true,
  env: {
    "node": true
  },
  parserOptions: {
    project: "./tsconfig.json",
    sourceType: "module",
  },
};
