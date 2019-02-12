import { JSDOM } from "jsdom";
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
      const document = (await JSDOM.fromURL(self.url)).window.document;

      self.scrapeTitle(document);
      self.scrapeThumbnailUrl(document);
      self.scrapeEpisodes(document);

      cb();
    } catch (err) {
      console.error(err);
    }
  }
}
