"use strict";

import fetch from "isomorphic-unfetch";
import React from "react";
import { useRouter } from "next/router";
import App from "../../../layout/app";
import Head from "../../../components/head";

import "../../../style/comics.scss";

function Empty() {
  const self = this;
  const router = useRouter();
  const { magazineID, title } = router.query;

  (async () => {
    await (await fetch(`https://api-comicstand.phanective.org/${magazineID}/${title}.json`)).json();
  })();

  return "";
}

export default class Comics extends React.Component {
  constructor() {
    super();



    this.state = {
      comic: {},
    };


  }



  render() {
    return (
      <App>
        <Head path="/" />
        <main>
          <Empty />
        </main>
      </App>
    );
  }
}
