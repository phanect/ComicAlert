import { fixchar } from "fixchar";
import * as grabity from "grabity";
import { JSDOM } from "jsdom";

import { Comic } from "./Comic";
import { Episode } from "./Episode";

export class MagGarden {
  constructor(private url: string) {
  }

  analyzeMagazinePage($: any, cb : any) {
    const self = this;

    $("div#comicList02 > ul > li").each((i, elem) => {
      const comicUrl = elem.find("a").attr("href");

      if (comicUrl != self.url && comicUrl.includes(self.url)) {
        self.comicUrls.push(comicUrl);
      }

      // the last element
      if (i + 1 === $("div#comicList02 > ul > li").length) {
        cb();
      }
    });
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
