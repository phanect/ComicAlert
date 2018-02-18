import { CronJob } from "cron";
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

exports.start = function() {
  var job = new CronJob({
    // minute, hour, day, month, weekday
    cronTime : "0 14 5 * * *", // Execute on 5:14:0 everyday

    onTick : function() {
      analyze();
    },
    onComplete : function() {
    },
    start : true, // Specified whether to start the job after just before exiting the constructor.
    timeZone : "Asia/Tokyo"
  });


  job.start();

  // TODO remove all comic data before analysis so that apply code changes
  analyze();
};
