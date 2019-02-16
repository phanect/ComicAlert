"use strict";

import React from "react";
import NextHead from "next/head";
import PropTypes from "prop-types";

const Head = props => (
  <NextHead>
    <title>Comic Alert</title>
    {/* <meta name="description" content="" /> */}
    <meta name="author" content="phanect" />
    <meta name="viewport" content="width=device-width" />

    <%- styleLink('style.css', {rel:'stylesheet'}) %>
  </NextHead>
);

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  path: PropTypes.string,
  ogImage: PropTypes.string,
};

export default Head;
