"use strict";

import fetch from "isomorphic-unfetch";
import React from "react";
import App from "../layout/app";
import ComicList from "../components/comic-list";
import Head from "../components/head";

import "../style/index.scss";

export default class Index extends React.Component {
  constructor() {
    super();

    const self = this;

    self.state = {
      favs: [],
      newArrivals: [],
      updates: [],
    };

    (async () => {
      try {
        self.setState({
          updates: await (await fetch("https://api-comicstand.phanective.org/comics.json")).json(),
        });
      } catch(err) {
        console.log(err); // TODO
      }
    })();
  }

  render() {
    return (
      <App>
        <Head path="/" />
        <main>
          <ComicList title="お気に入り" comics={this.state.favs} />
          <ComicList title="新連載・読切" comics={this.state.newArrivals} />
          <ComicList title="更新" comics={this.state.updates} />
        </main>
      </App>
    );
  }
}
