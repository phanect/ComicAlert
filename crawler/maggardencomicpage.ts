/// <reference path="./comicpage.ts" />
var moment = require("moment");
var ComicPage = require("./comicpage");

class MagGardenComicPage extends ComicPage {
	scrapeTitle($): string {
		// e.g. ROBOTICS;NOTES／原作：5pb. 漫画：浅川圭司
		var title: string = $("div#comicTitleArea > h2").text();
		return title.toHalfWidth().split("/")[0];
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
		var episodeName: string, episodeNum: number, episodeUrl: string, publishedAt;
		
		$("div.read-box-inner").each(function(i, elem) {
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
			tmp = text.match(/\d{1,4}話/)[0];
			if (tmp != null) {
				episodeNum = tmp[0];
			} else {
				episodeNum = null;
				return;
			}
			
			var episodeName = "第" + episodeNum + "話";
			
			callback(episodeName, episodeNum, episodeUrl, publishedAt);
		});
	}
}
export = MagGardenComicPage;