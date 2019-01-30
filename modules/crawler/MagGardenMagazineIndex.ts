import { MagazineIndex } from "./MagazineIndex";

export class MagGardenMagazineIndex extends MagazineIndex {
  async analyzeComics($: any): Promise<void> {
    const self = this;

    return new Promise((resolve, reject) => {
      $("div#comicList02 > ul > li").each((i, elem) => {
        const comicUrl = elem.find("a").attr("href");

        if (comicUrl != self.url && comicUrl.includes(self.url)) {
          self.comicUrls.push(comicUrl);
        }

        // the last element
        if (i + 1 === $("div#comicList02 > ul > li").length) {
          resolve();
        }
      });
    });
  }
}
