"use strict";

import React from "react";
import PropTypes from "prop-types";

const ComicList = props => (
  <div>
    <h2 className="list-title">{props.title}</h2>
    <div>
      {props.comics.map((comic, i) => (
        <figure className="comic" key={i}>
          <img src={comic.thumbnailURL} className="thumbnail" decoding="async" />
          <figcaption>{25 < comic.title.length ? comic.title.slice(0, 25) + "…" : comic.title}</figcaption>
          <div className="latest-episode">
            {comic.episodes[0].title}<br />
            {new Date(comic.episodes[0].publishedAt).toLocaleDateString("ja-JP")} 更新
          </div>
        </figure>
      ))}
    </div>
  </div>
);

ComicList.propTypes = {
  title: PropTypes.string,
  comic: PropTypes.array,
}

export default ComicList;
