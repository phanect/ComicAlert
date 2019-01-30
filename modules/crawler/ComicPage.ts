import * as cheerio from "cheerio";
import fetch from "node-fetch";

export class ComicPage {
  comic : any;
  title : string;
  thumbnailUrl : string;
  episodes : Array<any> = new Array();
  concluded : boolean = false;

  constructor(public url : string) {

  }

  scrapeTitle($: any): void {
    throw new Error("This method must be overrided. Aren't you using ComicPage class directly?");
  }

  scrapeThumbnailUrl($: any): void {
    throw new Error("This method must be overrided. Aren't you using ComicPage class directly?");
  }

  scrapeEpisodes($: any): void {
    throw new Error("This method must be overrided. Aren't you using ComicPage class directly?");
  }

  analyze(cb : any) : void {
    const self = this;

    try {
      const res = await fetch(self.url),
            html = await res.text(),
            $ = cheerio.load(html);

      if (res.status !== 200) {
        throw new Error("Return status code " + res.status);
      }

      self.scrapeTitle($);
      self.scrapeThumbnailUrl($);
      self.scrapeEpisodes($);

      cb();
    } catch (err) {
      console.error(err);
    }
  }
}
