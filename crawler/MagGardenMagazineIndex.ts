import { MagazineIndex } from "./MagazineIndex";

export class MagGardenMagazineIndex extends MagazineIndex {
  analyzeComics($: any, cb : any) {
    var self = this;
    $("div#comicList02 > ul > li").each(function(i, elem) {
      var comicUrl = $(this).find("a").attr("href");

      if (comicUrl != self.url && comicUrl.contains(self.url)) {
        self.comicUrls.push(comicUrl);
      }

      // the last element
      if (i + 1 === $("div#comicList02 > ul > li").length) {
        cb();
      }
    });
  }
}
