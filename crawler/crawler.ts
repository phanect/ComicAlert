/// <reference path="../lib/external/DefinitelyTyped/node/node.d.ts" />
/// <reference path="./maggardencomicpage.ts" />
/// <reference path="./MagazineIndex.ts" />
/// <reference path="./MagGardenMagazineIndex.ts" />

var cronJob : any = require("cron").CronJob;
var genny : any = require("genny");
import mgcp = require("./maggardencomicpage");
var MagGardenComicPage = mgcp.MagGardenComicPage;
import mgmi = require("./MagGardenMagazineIndex");
var MagGardenMagazineIndex = mgmi.MagGardenMagazineIndex;

import mi = require("./MagazineIndex");
var MagazineIndex : any = mi.MagazineIndex;

function analyze() : void {
	var magazines = [
		{url : "http://comic.mag-garden.co.jp/blade/", name : "ブレイドオンライン"},
		{url : "http://comic.mag-garden.co.jp/eden/", name : "WEBコミック EDEN"},
		{url : "http://comic.mag-garden.co.jp/beats/", name : "WEBコミック Beat's"}
	];

	for(var i in magazines) {
		genny.run(function (resume) {
			var magazineIndex = new MagGardenMagazineIndex(magazines[i].url, magazines[i].name);
			var result = yield(magazineIndex.analyzeAndSave());
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
