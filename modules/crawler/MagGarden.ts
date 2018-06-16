import { fixchar } from "fixchar";
import * as grabity from "grabity";
import { JSDOM } from "jsdom";

import { Magazine } from "./interfaces/Magazine";
import { Comic } from "./interfaces/Comic";
import { Episode } from "./interfaces/Episode";
import { Site } from "./Site";

export class MagGarden extends Site {
  public constructor() {
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

  async analyzeMagazinePage($: any): Promise<void> {
    const self = this;

    return new Promise((resolve, reject) => {
      $("div#comicList02 > ul > li").each((i, elem) => {
        const comicUrl = elem.find("a").attr("href");

        if (comicUrl != self.url && comicUrl.includes(self.url)) {
          self.comicUrls.push(comicUrl);
        }

        // the last element
        if (i + 1 === $("div#comicList02 > ul > li").length) {
          resolve();
        }
      });
    });
  }

  private async analyzeComicPage(url: string): Promise<Comic> {
    const ogp = await grabity.grabIt(url),
          document = new JSDOM("", {
            url: url,
          }).window.document,
          topicMsg = document.getElementById("topics2").innerText;

    return {
      url,
      title: fixchar(ogp.title || ogp["og:title"] || ogp["twitter:title"]).trim(),
      thumbnailURL: ogp.image || ogp["og:image"] || ogp["twitter:image:src"],
      concluded: (topicMsg.includes("連載は終了しました") || topicMsg.includes("特別読切作品")),
      episodes: this.scrapeEpisodes(document)
    };
  }

  private scrapeEpisodes(document: Document): Episode[] {
    let episodes: Episode[] = [];

    for (const episodeBox of Array.from(document.querySelectorAll("article.article-mangalist"))) {
      const episodeLink = episodeBox.querySelector(".inner > a"),
            episodeTitle = fixchar(episodeLink.innerHTML),
            episodeURL = episodeLink.getAttribute("href");

      if (!episodeTitle || !episodeURL) {
        throw new Error("Cannot get Episode");
      }

      episodes.push({
        title: episodeTitle,
        pcURL: episodeURL,
        mobileURL: episodeURL.replace("/HTML5/pc.html", "/HTML5/sd.html"),
        publishedAt: new Date(),
        expiresAt: null,
      });
    }

    return episodes;
  }
}
