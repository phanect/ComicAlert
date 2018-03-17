import * as fixchar from "fixchar";
import * as moment from "moment";
import { ComicPage } from "./ComicPage";

export class MagGardenComicPage extends ComicPage {
  scrapeTitle($ : any): void {
    // e.g. ROBOTICS;NOTES／原作：5pb. 漫画：浅川圭司
    const title: string = $("div#comicTitleArea > h2").text();

    if (!title) {
      return;
    }

    this.title = fixchar(title).split("/")[0].trim();
    this.title = this.title.replace("【新連載】", "")

    if (this.title.includes("連載終了")) {
      this.concluded = true;
    }
  }

  scrapeThumbnailUrl($ : any): void {
    // e.g. assets/images/comic/BLADE/ROBOTICS/story.jpg
    const thumbnailUrl: string = $("img.cutImage").attr("src");

    if (!thumbnailUrl) {
      return;
    }
    this.thumbnailUrl = "http://comic.mag-garden.co.jp/" + thumbnailUrl;
  }

  scrapeEpisodes($ : any): void {
    const self = this;

    $("div.read-box-inner").each(function(i, elem) {
      const episode : any = {}
        , readBoxInner : any = $(this)
        , text : string
        , tmp : any;

      // Return value example: 2月28日公開／最新直前3月号掲載25話
      text = fixchar(readBoxInner.find("div.txt").find("h3").text());

      episode.url = readBoxInner.find("div.txt").find("ul")
              .find("li.readComic").find("a").attr("href");

      episode.subTitle = "";

      // Extract updateDate
      tmp = text.match(/\d{1,2}月\d{1,2}日/);
      if (tmp !== null) {
        // If today is 2014/03/23 and written "12月14日",
        // the result will be 2014/12/14 although it is
        // actually published at 2013/12/14
        tmp = moment(tmp[0], "MM月DD日");

        if (tmp > moment()) { // if date stored in tmp is the future
          episode.publishedAt = tmp.subtract({years : 1});
        } else {
          episode.publishedAt = tmp;
        }
      } else {
        episode.publishedAt = null; // Now
      }

      // Extract Episode number
      tmp = text.match(/\d{1,4}話/); // e.g. "3話"
      if (tmp != null) {
        tmp = tmp[0].match(/\d/); // e.g. "2"

        if (tmp != null) {
          episode.num = tmp[0];
          episode.name = "第" + episode.num + "話";
          self.episodes.push(episode);
        }
      }
      // episode.num is essential value to acquire, so if failed to get, do not register to DB.
      // TODO but log error and report admin
    });
  }
}
