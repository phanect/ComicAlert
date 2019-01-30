import * as cheerio from "cheerio";
import fetch from "node-fetch";

export class MagazineIndex {
  comicUrls : Array<string> = new Array();

  constructor(public url: string, private name: string) {
    console.log("Analyzing Magazine:", this.name, "<", this.url, ">");
  }

  analyzeComics($ : any, cb : any) : void {
    throw new Error("This method must be overrided. Aren't you using MagazineIndex class directly?");
  }

  private analyze(cb) {
    const self = this;

    try {
      const res = await fetch(self.url),
            html = await res.text(),
            $ = cheerio.load(html);

      if (res.status !== 200) {
        throw new Error("Return status code " + res.status);
      }

      self.analyzeComics($, cb);
    } catch (err) {
      console.error(err);
    }
  }
}
