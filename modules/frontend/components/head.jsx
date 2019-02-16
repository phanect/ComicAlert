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

    <!-- The HTML5 shim, for IE6-8 support of HTML elements -->
    <!--[if lt IE 9]>
    <%- scriptLink('http://html5shim.googlecode.com/svn/trunk/html5.js', {type:'text/javascript'}) %>
    <![endif]-->

    <%- scriptLink("//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js", {type:'text/javascript'}) %>
    <%- scriptLink("//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js", {type:'text/javascript'}) %>
    <%- scriptLink('config/init.js', {type: 'text/javascript'}) %>
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
