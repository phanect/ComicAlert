import * as moment from "moment";
import { ComicPage } from "./ComicPage";

export class UraSundayComicPage extends ComicPage {
  scrapeTitle($ : any): void {
    // e.g. ROBOTICS;NOTES／原作：5pb. 漫画：浅川圭司
    var title: string = $("div.detailComicDetailComicTitle > h2").text();

    if (!title) {
      return;
    }

    this.title = title.toHalfWidth().trim();
  }

  scrapeThumbnailUrl($ : any): void {
    // e.g. assets/images/comic/BLADE/ROBOTICS/story.jpg
    var thumbnailUrl: string = $("detailComicDetailNLT01 > img").attr("src");

    if (!thumbnailUrl) {
      return;
    }
    this.thumbnailUrl = new URI(thumbnailUrl).absoluteTo(self.url).toString();
  }

  scrapeEpisodes($ : any): void {
    var self = this;
    $("detailComicDetailND01 > ul").each(function(i, elem) {
      var episode : any = {}
        , comicBox = $(this).find(".comicsCoverBox2")
        , text : string
        , tmp : any;

      // Return value example: 76話
      episode.name = comicBox.find("p").toHalfWidth();
      episode.url = new URI(comicBox.find("a").attr("href")).absoluteTo(self.url).toString();
      episode.subTitle = "";

      episode.number = episode.name.match(/\d/)[0];

      // TODO publishedAt

      console.log(episode.name, episode.url, episode.number);
      self.episodes.push(episode);
    });
  }
}
