"use strict";

import React from "react";
import NextHead from "next/head";
import PropTypes from "prop-types";

const origin = "https://comicstand.phanective.org",
      defaultDescription = "Comic Standは、無料のWebコミックを集めた漫画ポータルサイトです。";

const Head = props => (
  <NextHead>
    <title>{props.title + " ― " || ""}Comic Stand</title>
    <meta name="description" content={props.description || defaultDescription} />
    <meta name="author" content="phanect" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </NextHead>
);

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  path: PropTypes.string,
  ogImage: PropTypes.string,
};

export default Head;
