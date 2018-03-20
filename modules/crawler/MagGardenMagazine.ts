import { Magazine } from "./Magazine";

export class MagGardenMagazine extends Magazine {
  analyzeComics($: any, cb : any) {
    const self = this;

    $("div#comicList02 > ul > li").each((i, elem) => {
      const comicUrl = elem.find("a").attr("href");

      if (comicUrl != self.url && comicUrl.includes(self.url)) {
        self.comicUrls.push(comicUrl);
      }

      // the last element
      if (i + 1 === $("div#comicList02 > ul > li").length) {
        cb();
      }
    });
  }
}
