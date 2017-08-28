/// <reference path="../lib/external/DefinitelyTyped/node/node.d.ts" />
/// <reference path="../lib/commons.ts" />
/// <reference path="./MagGardenComicPage.ts" />

var cheerio = require("cheerio");
var request = require("request");

import mgcp = require("./MagGardenComicPage");
var MagGardenComicPage = mgcp.MagGardenComicPage;
import uscp = require("./UraSundayComicPage");
var UraSundayComicPage = uscp.UraSundayComicPage;
var Utils = require("../lib/commons");

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
          if (comicUrl.contains("comic.mag-garden.co.jp")) {
            new MagGardenComicPage(comicUrl).analyzeAndSave();
          } else if (comicUrl.contains("urasunday.com")) {
            new UraSundayComicPage(comicUrl).analyzeAndSave();
          }
        }
      });
    });
  }
}
