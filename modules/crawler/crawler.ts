import * as genny from "genny";
import { MagGardenComicPage } from "./MagGardenComicPage";
import { MagGardenMagazineIndex } from "./MagGardenMagazineIndex";
import { MagazineIndex } from "./MagazineIndex";

function analyze() : void {
  let magazines = [];

  magazines.push(new MagGardenMagazineIndex("http://comic.mag-garden.co.jp/blade/", "ブレイドオンライン"));
  magazines.push(new MagGardenMagazineIndex("http://comic.mag-garden.co.jp/eden/", "WEB コミック EDEN"));
  magazines.push(new MagGardenMagazineIndex("http://comic.mag-garden.co.jp/beats/", "WEBコミック Beat's"));

  for(const i in magazines) {
    genny.run(function (resume) {
      var result = yield(magazines[i].analyze());
    });
  }
};

// TODO remove all comic data before analysis so that apply code changes
analyze();
