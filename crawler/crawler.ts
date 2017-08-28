var cronJob : any = require("cron").CronJob;
var genny : any = require("genny");
import mgcp = require("./MagGardenComicPage");
var MagGardenComicPage = mgcp.MagGardenComicPage;
import mgmi = require("./MagGardenMagazineIndex");
var MagGardenMagazineIndex = mgmi.MagGardenMagazineIndex;
import us = require("./UraSundayMagazineIndex");
var UraSundayMagazineIndex = us.UraSundayMagazineIndex;

import mi = require("./MagazineIndex");
var MagazineIndex : any = mi.MagazineIndex;

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
  var job = new cronJob({
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
