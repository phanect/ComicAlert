/// <reference path="../lib/external/DefinitelyTyped/node/node.d.ts" />
/// <reference path="../lib/commons.ts" />

var cheerio = require("cheerio");
var http = require("http");

require("../lib/commons");

class ComicPage {
	comic: any;
	episodes: Array<any> = new Array();

	constructor(private url: string) {
		
	}
	
	scrapeTitle($): string {
		throw new Error("This method must be overrided. Aren't you using ComicPage class directly?");
	}
	
	scrapeThumbnailUrl($): string {
		throw new Error("This method must be overrided. Aren't you using ComicPage class directly?");
	}
	
	scrapeEpisodes($, callback): void {
		throw new Error("This method must be overrided. Aren't you using ComicPage class directly?");
	}

	analyzeAndSave(): void {
		var html = "";
		var self = this;

		http.get(self.url, function(response) {
			response.on("data", function(chunk) {
				html = html + chunk;
			});

			response.on("end", function() {
				var $ = cheerio.load(html);

				var title: string = self.scrapeTitle($);
				var thumbnailUrl: string = self.scrapeThumbnailUrl($);

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
					self.scrapeEpisodes($, function(episodeName, episodeNum, episodeUrl, publishedAt) {
						geddy.model.Episode.first({comicId: self.comic.id, number: episodeNum},
								function(err, episode) {
										
							if (episode === undefined) { // New Episode
								episode = geddy.model.Episode.create({
									name : episodeName,
									number : episodeNum,
									url : episodeUrl,
									publishedAt : publishedAt,
									hasRead : false,
									comicId: self.comic.id
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
									name : episodeName,
									number : episodeNum,
									url : episodeUrl,
									publishedAt : publishedAt,
									comicId: self.comic.id
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
