import { fixchar } from "fixchar";
import * as grabity from "grabity";
import { JSDOM } from "jsdom";

import { Comic } from "./Comic";
import { Episode } from "./Episode";
import { Magazine } from "./Magazine";
import { Site } from "./Site";

export class MagGarden extends Site {
  constructor() {
    super();

    this.configs = [
      {
        id: "maggarden",
        name: "マッグガーデン",
        urls: [
          "https://comic.mag-garden.co.jp/all/",
          "https://comic.mag-garden.co.jp/yomikiri/",
          "https://comic.mag-garden.co.jp/past/",
        ],
      },
    ];
  }

  async analyzeMagazinePage(
    url: string,
    name: string,
    id: string,
  ): Promise<any> {
    const document = new JSDOM("", {
            url: url,
          }).window.document,
          magazine = new Magazine(name, id),
          comics: Comic[] = [];

    for (const comicBox of document.querySelectorAll("article.cbox")) {
      const comicURL = comicBox.querySelector(".inner > a.cbox-main").getAttribute("href");

      comics.push(await this.analyzeComicPage(comicURL));
    }

    this.comics = comics;
    this.magazines.push(magazine);
  }

  async analyzeComicPage(url: string): Promise<Comic> {
    const ogp = await grabity.grabIt(url),
          document = new JSDOM("", {
            url: url,
          }).window.document,
          comic = new Comic(url);

    comic.Title = fixchar(ogp.title || ogp["og:title"] || ogp["twitter:title"]).trim();
    comic.ThumbnailURL = ogp.image || ogp["og:image"] || ogp["twitter:image:src"];

    const topicMsg = document.getElementById("topics2").innerText;
    comic.Concluded = (topicMsg.includes("連載は終了しました") || topicMsg.includes("特別読切作品"));

    comic.Episodes = this.scrapeEpisodes(document);

    return comic;
  }

  private scrapeEpisodes(document: Document): Episode[] {
    let episodes: Episode[] = [];

    for (const episodeBox of document.querySelectorAll("article.article-mangalist")) {
      const episodeLink = episodeBox.querySelector(".inner > a"),
            episodeTitle = fixchar(episodeLink.innerText),
            episodeURL = episodeLink.getAttribute("href");

      if (!episodeTitle || !episodeURL) {
        throw new Error("Cannot get Episode");
      }

      episodes.push(new Episode(
        episodeTitle,
        episodeURL,
        episodeURL.replace("/HTML5/pc.html", "/HTML5/sd.html"),
        new Date(),
      ));
    }

    return episodes;
  }
}
