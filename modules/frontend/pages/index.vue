"use strict";

import React from "react";
import App from "../layout/app";
import ComicList from "../components/comic-list";
import Head from "../components/head";

import "../style/index.scss";

export default class Index extends React.Component {
  constructor() {
    super();

    this.state = {
      favs: [
        {
          url: "https://comic.mag-garden.co.jp/psychoss2/",
          title: "PSYCHO-PASS サイコパス Sinners of the System Case.2 First Guardian",
          thumbnailURL:"https://comic.mag-garden.co.jp/wordpress/wp-content/uploads/psychoss2-thumb.jpg",
          concluded:false,
          episodes:[
            {
              title:"第1話",
              pcURL:"/assets/files/psychoss2190215/HTML5/pc.html",
              mobileURL:"/assets/files/psychoss2190215/HTML5/sd.html",
              publishedAt:"2019-02-16T09:52:15.169Z",
              expiresAt:null,
            },
          ],
        },
        {
          url:"https://comic.mag-garden.co.jp/graveyard/",
          title:"グレイヴヤードの捩じくれた家",
          thumbnailURL:"https://comic.mag-garden.co.jp/wordpress/wp-content/uploads/graveyard-thumb.jpg",
          concluded:false,
          episodes:[
            {
              title:"第2話",
              pcURL:"/assets/files/graveyard190210/HTML5/pc.html",
              mobileURL:"/assets/files/graveyard190210/HTML5/sd.html",
              publishedAt:"2019-02-16T09:52:17.333Z",
              expiresAt:null,
            },
            {
              title:"第1話",
              pcURL:"/assets/files/graveyard190110/HTML5/pc.html",
              mobileURL:"/assets/files/graveyard190110/HTML5/sd.html",
              publishedAt:"2019-02-16T09:52:17.333Z",
              expiresAt:null,
            },
          ],
        },
      ],
    };
  }

  render() {
    return (
      <App>
        <main>
          <ComicList title="お気に入り" comics={this.state.favs} />
          <ComicList title="新連載・読切" comics={this.state.favs} />
          <ComicList title="更新" comics={this.state.favs} />
        </main>
      </App>
    );
  }
}
