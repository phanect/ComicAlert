import * as genny from "genny";
import { MagGardenComicPage } from "./MagGardenComicPage";
import { MagGardenMagazineIndex } from "./MagGardenMagazineIndex";
import { UraSundayMagazineIndex } from "./UraSundayMagazineIndex";
import { MagazineIndex } from "./MagazineIndex";

function analyze() : void {
  var magazines = [];
  magazines.push(new UraSundayMagazineIndex("http://urasunday.com/", "裏サンデー"));
  magazines.push(new MagGardenMagazineIndex("http://comic.mag-garden.co.jp/blade/", "ブレイドオンライン"));
  magazines.push(new MagGardenMagazineIndex("http://comic.mag-garden.co.jp/eden/", "WEB コミック EDEN"));
  magazines.push(new MagGardenMagazineIndex("http://comic.mag-garden.co.jp/beats/", "WEBコミック Beat's"));

  for(var i in magazines) {
    genny.run(function (resume) {
      var result = yield(magazines[i].analyzeAndSave());
    });
  }
};

// TODO remove all comic data before analysis so that apply code changes
analyze();
