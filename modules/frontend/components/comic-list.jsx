"use strict";

import React from "react";
import PropTypes from "prop-types";

import "./comic-list.scss";

const ComicList = props => {
  if (0 < props.comics.length) {
    return (
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
                最新話: {comic.episodes[0].title}<br />
                {new Date(comic.episodes[0].publishedAt).toLocaleDateString("ja-JP")} 更新
              </div>
            </figure>
          ))}
        </div>
      </div>
    );
  } else {
    return "";
  }
};

ComicList.propTypes = {
  title: PropTypes.string,
  comics: PropTypes.array,
};

export default ComicList;
