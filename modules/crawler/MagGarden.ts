import { fixchar } from "fixchar";
import { Magazine } from "./interfaces/Magazine";
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

  async analyzeComicPage() {
    //
    // Scraping title
    //
    // e.g. ROBOTICS;NOTES／原作：5pb. 漫画：浅川圭司
    const title: string = $("div#comicTitleArea > h2").text();

    if (!title) {
      return;
    }

    this.title = fixchar(title).split("/")[0].trim();
    this.title = this.title.replace("【新連載】", "")

    if (this.title.includes("連載終了")) {
      this.concluded = true;
    }

    //
    // scraping thumbnail URL
    //
    // e.g. assets/images/comic/BLADE/ROBOTICS/story.jpg
    const thumbnailUrl: string = $("img.cutImage").attr("src");

    if (!thumbnailUrl) {
      return;
    }
    this.thumbnailUrl = "http://comic.mag-garden.co.jp/" + thumbnailUrl;

    this.scrapeEpisodes(document);
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
