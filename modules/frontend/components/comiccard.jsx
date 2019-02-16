"use strict";

export default props => (
  <div className="comiccard col-md-3" id="episode-{props.episode.id}">
    <div className="comiccard-title">
      <a href={props.url} target="_blank">
        {props.title}
      </a>
    </div>

    <div className="comiccard-container">
      <div className="comiccard-cell">
        <a href={props.url} target="_blank">
          <img src={props.thumbnailUrl || "/img/noimage.png"}
            alt={props.title} width="118" height="118" />
        </a>
      </div>
      <div className="comiccard-cell">
        <span className="episode-title">
          {props.episode.name}{((props.episode.subTitle) ? " " + props.episode.subTitle : "")}
        </span>
        &nbsp;
        <span className="available-term">
          ({props.episode.formattedPublishedAt()}～{(props.episode.availableUntil) ? props.episode.formattedAvailableUntil() : "不明"})
        </span>

        <a className="read-button" href={props.episode.url} target="_blank">読む</a>
      </div>
    </div>
  </div>
);
