import { fixchar } from "fixchar";
import * as grabity from "grabity";
import { JSDOM } from "jsdom";

import { Comic } from "./Comic";
import { Episode } from "./Episode";
import { Magazine } from "./Magazine";

export class MagGarden {
  private magazines: Magazine[] = [];

  get Magazines() {
    return this.magazines;
  }

  constructor(private urls: string[], private name: string) {
  }

  async crawl() {
    for (const url of this.urls) {
      await this.analyzeMagazinePage({ url: url, name: this.name });
    }
  }

  async analyzeMagazinePage(opt: { url: string, name: string }): Promise<any> {
    const document = new JSDOM("", {
            url: opt.url,
          }).window.document,
          magazine = new Magazine(opt.name),
          comics: Comic[] = [];

    for (const comicBox of document.querySelectorAll("article.cbox")) {
      const comicURL = comicBox.querySelector(".inner > a.cbox-main").getAttribute("href");

      comics.push(await this.analyzeComicPage(comicURL));
    }

    magazine.Comics = comics;
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
