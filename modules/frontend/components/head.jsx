"use strict";

import React from "react";
import NextHead from "next/head";
import PropTypes from "prop-types";

const origin = "https://comicstand.phanective.org";
const defaultDescription = "Comic Standは、無料のWebコミックを集めた漫画ポータルサイトです。";
const defaultOGImage = "/path/to/og/image"; // TODO

const Head = props => (
  <NextHead>
    <title>{props.title + " ― " || ""}Comic Stand</title>
    <meta name="description" content={props.description || defaultDescription} />
    <meta name="author" content="phanect" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    {/* TODO
    <link rel="canonical" href={origin + props.path} />

    <link rel="icon" sizes="192x192" href="/static/touch-icon.png" />
    <link rel="apple-touch-icon" href="/static/touch-icon.png" />
    <link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" />
    <link rel="icon" href="/static/favicon.ico" />


    <meta property="og:url" content={origin + props.path} />
    <meta property="og:title" content={props.title || "Comic Stand"} />
    <meta
      property="og:description"
      content={props.description || defaultDescription}
    />
    <meta name="twitter:site" content={origin + props.path} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    */}
  </NextHead>
);

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  path: PropTypes.string,
  ogImage: PropTypes.string,
};

export default Head;
