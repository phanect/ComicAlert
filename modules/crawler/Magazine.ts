import * as cheerio from "cheerio";
import fetch from "node-fetch";
import { MagGardenComic } from "./MagGardenComic";

export class Magazine {
  comicUrls : Array<string> = new Array();

  constructor(public url: string, private name: string) {
    console.log("Analyzing Magazine:", this.name, "<", this.url, ">");
  }

  analyzeComics($ : any, cb : any) : void {
    throw new Error("This method must be overrided. Aren't you using Magazine class directly?");
  }

  analyzeAndSave() : void {
    const self = this;

    self.analyze((comicUrls) => {
      self.save();
    });
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

  private save() {
    if (!this.comicUrls || this.comicUrls.length <= 0) { throw new Error("comicUrls is empty."); }

    this.comicUrls.forEach((comicUrl) => {
      geddy.model.Comic.first({url : comicUrl}, (comic) => {
        if (!comic) {
          if (comicUrl.includes("comic.mag-garden.co.jp")) {
            new MagGardenComic(comicUrl).analyzeAndSave();
          }
        }
      });
    });
  }
}
