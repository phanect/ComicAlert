/// <reference path="./comicpage.ts" />
var moment = require("moment");
var ComicPage = require("./comicpage");

class MagGardenComicPage extends ComicPage {
	scrapeTitle($): string {
		// e.g. ROBOTICS;NOTES／原作：5pb. 漫画：浅川圭司
		var title: string = $("div#comicTitleArea > h2").text();
		return title.toHalfWidth().split("/")[0].trim();
	}

	scrapeThumbnailUrl($): string {
		// e.g. assets/images/comic/BLADE/ROBOTICS/story.jpg
		var thumbnailUrl: string = $("img.cutImage").attr("src");
		return "http://comic.mag-garden.co.jp/" + thumbnailUrl;
	}
	
	scrapeEpisodes($, callback): void {
		var readBoxInner;
		var text: string;
		var tmp: any;

		$("div.read-box-inner").each(function(i, elem) {
			var episodeName: string = null;
			var episodeNum: number = null;
			var episodeSubTitle: string = null;
			var episodeUrl: string = null;
			var publishedAt = null;
		
			readBoxInner = $(this);
			
			// Return value example: 2月28日公開／最新直前3月号掲載25話
			text = readBoxInner.find("div.txt").find("h3").text().toHalfWidth();

			episodeUrl = readBoxInner.find("div.txt").find("ul")
							.find("li.readComic").find("a").attr("href");

			// Extract updateDate
			tmp = text.match(/\d{1,2}月\d{1,2}日/);
			if (tmp !== null) {
				publishedAt = moment(tmp[0], "MM月DD日");
			} else {
				publishedAt = null;
			}
			
			// Extract Episode number
			tmp = text.match(/\d{1,4}話/); // e.g. "3話"
			if (tmp != null) {
				tmp = tmp[0].match(/\d/); // e.g. "2"
				
				if (tmp != null) {
					episodeNum = tmp[0];
					episodeName = "第" + episodeNum + "話";
					callback(episodeName, episodeNum, episodeSubTitle, episodeUrl, publishedAt);
				}
			}
			// episodeNum is essential value to acquire, so if failed to get, do not register to DB.
		});
	}
}
export = MagGardenComicPage;