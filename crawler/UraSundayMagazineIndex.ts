import { MagazineIndex } from "./MagazineIndex";
import { URI } from "URIjs";

export class UraSundayMagazineIndex extends MagazineIndex {
  analyzeComics($: any, cb : any) {
    var self = this;
    $("div.menuRankingBox > a").each(function(i, elem) {
      var className = $(this).attr("class")
        , comicUrl = $(this).attr("href");

      if (!className.includes("menuRankingButton")) {
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
