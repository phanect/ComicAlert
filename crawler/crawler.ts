/// <reference path="../lib/external/DefinitelyTyped/node/node.d.ts" />
/// <reference path="./maggardencomicpage.ts" />

var cronJob = require("cron").CronJob;
var MagGardenComicPage = require("./maggardencomicpage.js");

exports.analyzeComics = function() {
	var urls = [
				"http://comic.mag-garden.co.jp/blade/784.html",
				"http://comic.mag-garden.co.jp/blade/2764.html",
				"http://comic.mag-garden.co.jp/blade/2781.html",
				"http://comic.mag-garden.co.jp/avarus/3499.html",
				"http://comic.mag-garden.co.jp/beats/3342.html",
				"http://comic.mag-garden.co.jp/beats/3460.html",
				"http://comic.mag-garden.co.jp/beats/196.html",
				"http://comic.mag-garden.co.jp/beats/433.html",
				"http://comic.mag-garden.co.jp/beats/2737.html"
			];

	for(var i in urls) {
		new MagGardenComicPage(urls[i]).analyzeAndSave();
	}
}

exports.start = function() {
	var job = new cronJob({
		// minute, hour, day, month, weekday
		cronTime : "0 14 5 * * *", // Execute on 5:14:0 everyday

		onTick : function() {

			
		},
		onComplete : function() {
		},
		start : true, // Specified whether to start the job after just before exiting the constructor.
		timeZone : "Asia/Tokyo"
	});

	// Runs your job.
	job.start();
};
