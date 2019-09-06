"use strict";

import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

import "./comic-list.scss";

const ComicCard = props => {
  if (props.comic.episodes.length <= 0) {
    return "";
  }

  return (
    <Link href={`/comics/${props.comic.magazineID}/${btoa(encodeURIComponent(props.comic.title))}`}>
      <figure className="comic">
        <img
          src={props.comic.thumbnailURL}
          alt="{comic.title}"
          className="thumbnail"
          decoding="async"
        />
        <figcaption>{props.comic.title}</figcaption>
        <div className="latest-episode">
          最新話: {props.comic.episodes[0].title}<br />
          {new Date(props.comic.episodes[0].publishedAt).toLocaleDateString("ja-JP")} 更新
        </div>
      </figure>
    </Link>
  );
};

ComicCard.propTypes = {
  comic: PropTypes.object,
};

const ComicList = props => {
  if (0 < props.comics.length) {
    return (
      <div>
        <h2 className="list-title">{props.title}</h2>
        <div>
          {props.comics.map((comic, i) => (
            <ComicCard comic={comic} key={i} />
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
