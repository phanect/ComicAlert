"use strict";

import React from "react";
import PropTypes from "prop-types";

import "./comic-list.scss";

const ComicList = props => (
  <div>
    <h2 className="list-title">{props.title}</h2>
    <div>
      {props.comics.map((comic, i) => (
        <figure className="comic" key={i}>
          <img
            src={comic.thumbnailURL}
            alt="{comic.title}"
            className="thumbnail"
            decoding="async"
          />
          <figcaption>{comic.title}</figcaption>
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
  comics: PropTypes.array,
}

export default ComicList;
