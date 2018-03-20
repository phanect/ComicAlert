import * as genny from "genny";
import { MagGardenComic } from "./MagGardenComic";
import { MagGardenMagazine } from "./MagGardenMagazine";
import { Magazine } from "./Magazine";

function analyze() : void {
  let magazines = [];

  magazines.push(new MagGardenMagazine("http://comic.mag-garden.co.jp/blade/", "ブレイドオンライン"));
  magazines.push(new MagGardenMagazine("http://comic.mag-garden.co.jp/eden/", "WEB コミック EDEN"));
  magazines.push(new MagGardenMagazine("http://comic.mag-garden.co.jp/beats/", "WEBコミック Beat's"));

  for(const i in magazines) {
    genny.run(function (resume) {
      var result = yield(magazines[i].analyzeAndSave());
    });
  }
};

// TODO remove all comic data before analysis so that apply code changes
analyze();
