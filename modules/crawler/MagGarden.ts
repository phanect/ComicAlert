import { fixchar } from "fixchar";
import * as grabity from "grabity";
import { JSDOM } from "jsdom";

import { Magazine } from "./interfaces/Magazine";
import { Comic } from "./interfaces/Comic";
import { Episode } from "./interfaces/Episode";
import { Site } from "./Site";
import { sleep } from "./utils";

export class MagGarden extends Site {
  public constructor() {
    super();

    this.configs = [
      {
        id: "maggarden",
        name: "マッグガーデン",
        urls: [
//          "https://comic.mag-garden.co.jp/all/",
          "https://comic.mag-garden.co.jp/yomikiri/",
//          "https://comic.mag-garden.co.jp/past/",
        ],
      },
    ];
  }

  protected async analyzeMagazinePage(
    url: string,
    name: string,
    id: string,
  ): Promise<Magazine> {
    const document = (await JSDOM.fromURL(url)).window.document;
    const comics: Comic[] = [];

    for (const comicBox of Array.from(document.querySelectorAll("article.cbox"))) {
      const comicURL = comicBox.querySelector(".inner > a.cbox-main").getAttribute("href");
      const comic = await MagGarden.analyzeComicPage(comicURL, id);

      if (comic) {
        comics.push(comic);
      }
    }

    this.comics = comics;

    console.info("MagGarden: Crawled Magazine Index");
    return { id, name, comics };
  }

  private static async analyzeComicPage(url: string, magazineID: string): Promise<Comic|null> {
    const ogp = await grabity.grabIt(url);
    const document = (await JSDOM.fromURL(url)).window.document;
    const topicMsg = document.getElementById("topics2").textContent;

    const comic = {
      url,
      title: fixchar(ogp.title || ogp["og:title"] || ogp["twitter:title"]).trim(),
      thumbnailURL: ogp.image || ogp["og:image"] || ogp["twitter:image:src"],
      concluded: (topicMsg.includes("連載は終了しました") || topicMsg.includes("特別読切作品")),
      episodes: MagGarden.scrapeEpisodes(document),
      magazineID,
    };

    if (comic.episodes.length <= 0) {
      return null;
    }

    console.info(`MagGarden: Crawled Comic Page - ${comic.title}`);

    // Wait for 2s to avoid too frequent access
    await sleep(2000);

    return comic;
  }

  private static scrapeEpisodes(document: Document): Episode[] {
    const episodes: Episode[] = [];

    for (const episodeBox of Array.from(document.querySelectorAll("article.article-mangalist"))) {
      const episodeLink = episodeBox.querySelector(".inner > a");
      const episodeTitle = fixchar(episodeLink.innerHTML);
      const episodeURL = episodeLink.getAttribute("href");

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

      console.info(`MagGarden: Episode - ${episodeTitle}`);
    }

    return episodes;
  }
}
