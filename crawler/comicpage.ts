/// <reference path="../lib/external/DefinitelyTyped/node/node.d.ts" />
/// <reference path="../lib/commons.ts" />

var cheerio = require("cheerio");
var http = require("http");
var moment = require("moment");

require("../lib/commons");

class ComicPage {
	comic: any;
	episodes: Array<any> = new Array();
	url: string;
	
	analyzeAndSave(url: string): void {
		var html = "";
		var self = this;
		this.url = url;

		http.get(url, function(response) {
			response.on("data", function(chunk) {
				html = html + chunk;
			});

			response.on("end", function() {
				var $ = cheerio.load(html);

				// e.g. ROBOTICS;NOTES／原作：5pb. 漫画：浅川圭司
				var title: string = $("div#comicTitleArea > h2").text();
				title = title.toHalfWidth().split("/")[0];
				
				// e.g. assets/images/comic/BLADE/ROBOTICS/story.jpg
				var thumbnailUrl: string = $("img.cutImage").attr("src");
				thumbnailUrl = "http://comic.mag-garden.co.jp/" + thumbnailUrl;

				geddy.model.Comic.first({url : self.url}, function(err, data) {
					if (err) {
						throw err;
					}

					if (data === undefined) { // New Comic
						self.comic = geddy.model.Comic.create({
							title: title,
							url: self.url,
							thumbnailUrl: thumbnailUrl
						});
						
						if (self.comic.isValid()) {
							self.comic.save(function (err, data) {
								if (err) {
									throw err;
								}
							});
						}
					} else { // Existing Comic
						self.comic = data;
						if (title !== self.comic.title) {
							self.comic.updateProperties({ title: title });
							self.comic.save(function (err, data) {
								if (err) {
									throw err;
								}
							});
						}
						if (thumbnailUrl !== self.comic.thumbnailUrl) {
							self.comic.updateProperties({ thumbnailUrl: thumbnailUrl });
							self.comic.save(function (err, data) {
								if (err) {
									throw err;
								}
							});
						}
					}
					
					//
					// Analysis of Episodes
					//
					var readBoxInner;
					var text: string;
					var tmp: any;
					var episodeUrl: string, publishedAt: any, episodeNum: number;
					$("div.read-box-inner").each(function(i, elem) {
						readBoxInner = $(this);
						text = readBoxInner.find("div.txt").find("h3").text();
						text = text.toHalfWidth();

						episodeUrl = readBoxInner.find("div.txt").find("ul")
										.find("li.readComic").find("a").attr("href");

						// Return value example: 2月28日公開／最新直前3月号掲載25話
						
						// Extract updateDate
						tmp = text.match(/\d{1,2}月\d{1,2}日/);
						if (tmp !== null) {
							publishedAt = moment(tmp[0], "MM月DD日");
						} else {
							publishedAt = null;
						}
						
						// Extract Episode number
						tmp = text.match(/\d{1,4}話/)[0];
						if (tmp != null) {
							episodeNum = tmp[0];
						} else {
							episodeNum = null;
							return;
						}
						
						geddy.model.Episode.first({comicId: self.comic.id, number: episodeNum},
								function(err, episode) {
										
							if (episode === undefined) { // New Episode
								episode = geddy.model.Episode.create({
									name : "第" + episodeNum + "話",
									number : episodeNum,
									url : episodeUrl,
									publishedAt : publishedAt,
									hasRead : false
								});

								if (episode.isValid()) {
									episode.save(function (err, data) {
										if (err) {
											throw err;
										}
									});
								}
								
								// TODO Alert it to the users
							} else { // Existing Episode
								episode.updateProperties({
									name : "第" + episodeNum + "話",
									number : episodeNum,
									url : episodeUrl,
									publishedAt : publishedAt
								});
								if (episode.isValid()) {
									episode.save(function (err, data) {
										if (err) {
											throw err;
										}
									});
									
									
								}
							}
							self.episodes.push(episode);
						});
					});
				});
			});
		});
	}

}

export = ComicPage;
