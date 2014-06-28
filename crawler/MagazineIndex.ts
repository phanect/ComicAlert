/// <reference path="../lib/external/DefinitelyTyped/node/node.d.ts" />
/// <reference path="../lib/commons.ts" />
/// <reference path="./maggardencomicpage.ts" />

var cheerio = require("cheerio");
var request = require("request");
var wait = require("wait.for-es6");

import mgcp = require("./maggardencomicpage");
var MagGardenComicPage = mgcp.MagGardenComicPage;
var Utils = require("../lib/commons");

export class MagazineIndex {
	constructor(private url: string, private name: string) {
		console.log("Analyzing Magazine:", self.name, "<", self.url, ">");
	}
	
	analyzeAndSave() : void {
		var self = this;

		self.analyze(function(comicUrls) {
			self.save(comicUrls);
		});
	}

	private analyze(cb) {
		var self = this;

		request({url : self.url, jar: true}, function(err, response, html){
			if (response.statusCode !== 200) {
				throw new Error("Return status code " + response.statusCode);
			} else if (err) {
				throw err;
			}

			var $ = cheerio.load(html)
				, comicUrls = new Array();

			$("div#comicList02 > ul > li").each(function(i, elem) {
				var comicUrl = $(this).find("a").attr("href");

				if (comicUrl != self.url && comicUrl.contains(self.url)) {
					comicUrls.push(comicUrl);
				}
				
				// the last element
				if (i + 1 === $("div#comicList02 > ul > li").length) {
					cb(comicUrls);
				}
			});
		});
	}

	private save(comicUrls : string[]) {
		comicUrls.forEach(function(comicUrl) {
			geddy.model.Comic.first({url : comicUrl}, function(comic) {
				if (!comic) {
					new MagGardenComicPage(comicUrl).analyzeAndSave();
				}
			});
		});
	}
}
