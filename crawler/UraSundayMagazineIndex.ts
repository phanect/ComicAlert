import mi = require("./MagazineIndex");
import uscp = require("./UraSundayComicPage");
import URI = require("URIjs")

export class UraSundayMagazineIndex extends mi.MagazineIndex {
  analyzeComics($: any, cb : any) {
    var self = this;
    $("div.menuRankingBox > a").each(function(i, elem) {
      var className = $(this).attr("class")
        , comicUrl = $(this).attr("href");

      if (!className.contains("menuRankingButton")) {
        comicUrl = comicUrl.replace(/index.html$/, "");
        comicUrl = new URI(comicUrl).absoluteTo(self.url).toString();
        self.comicUrls.push(comicUrl);
        console.log(comicUrl);
      }

      // the last element
      if (i + 1 === $("div.menuRankingBox > a").length) {
        cb();
      }
    });
  }
}
