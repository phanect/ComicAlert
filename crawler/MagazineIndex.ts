import * as cheerio from "cheerio";
import request from "request";
import { MagGardenComicPage } from "./MagGardenComicPage";

export class MagazineIndex {
  comicUrls : Array<string> = new Array();

  constructor(public url: string, private name: string) {
    console.log("Analyzing Magazine:", this.name, "<", this.url, ">");
  }

  analyzeComics($ : any, cb : any) : void {
    throw new Error("This method must be overrided. Aren't you using MagazineIndex class directly?");
  }

  analyzeAndSave() : void {
    var self = this;

    self.analyze(function(comicUrls) {
      self.save();
    });
  }

  private analyze(cb) {
    var self = this;

    request({url : self.url, jar: true}, function(err, response, html){
      if (response.statusCode !== 200) {
        throw new Error("Return status code " + response.statusCode);
      } else if (err) {
        throw err;
      }

      var $ = cheerio.load(html);
      self.analyzeComics($, cb);
    });
  }

  private save() {
    if (!this.comicUrls || this.comicUrls.length <= 0) { throw new Error("comicUrls is empty."); }

    this.comicUrls.forEach(function(comicUrl) {
      geddy.model.Comic.first({url : comicUrl}, function(comic) {
        if (!comic) {
          if (comicUrl.includes("comic.mag-garden.co.jp")) {
            new MagGardenComicPage(comicUrl).analyzeAndSave();
          }
        }
      });
    });
  }
}
