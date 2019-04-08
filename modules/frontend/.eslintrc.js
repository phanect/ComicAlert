"use strict";

module.exports = {
  extends: [
    "plugin:@phanect/js",
    "plugin:react/recommended"
  ],
  env: {
    browser: true,
    node: false,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    }
  },
  settings: {
    react: {
      createClass: "createReactClass",
      pragma: "React",
      version: "16.x",
    },
    "propWrapperFunctions": [
        // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
        "forbidExtraProps",
        {"property": "freeze", "object": "Object"},
        {"property": "myFavoriteWrapper"}
    ],
    "linkComponents": [
      "Hyperlink",
      { "name": "Link", "linkAttribute": "href" }
    ]
  }
};
