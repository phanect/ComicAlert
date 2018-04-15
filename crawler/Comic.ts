import * as moment from "moment";

import { getDOMWindow } from "./utils";

export class Comic {
  comic : any;
  title : string;
  thumbnailUrl : string;
  episodes : Array<any> = new Array();
  concluded : boolean = false;

  constructor(public url : string) {

  }

  scrapeTitle($: any): void {
    throw new Error("This method must be overrided. Aren't you using Comic class directly?");
  }

  scrapeThumbnailUrl($: any): void {
    throw new Error("This method must be overrided. Aren't you using Comic class directly?");
  }

  scrapeEpisodes($: any): void {
    throw new Error("This method must be overrided. Aren't you using Comic class directly?");
  }

  async analyze(cb : any) {
    const window = await getDOMWindow(this.url);

    this.scrapeTitle(window);
    this.scrapeThumbnailUrl(window);
    this.scrapeEpisodes(window);

    cb();
  }

  save() : void {
    const self = this;

    if (this.concluded) {
      self.remove();
      return;
    }

    geddy.model.Comic.first({ url: self.url }, (err, comic) => {
      if (err) { throw err; }

      if (!comic) { // New Comic
        self.comic = geddy.model.Comic.create({
          title: self.title,
          url: self.url,
          thumbnailUrl: self.thumbnailUrl
        });
        self.comic.save((err, comic) => {
          if (err) { throw err; }

          console.log("Saved new comic:", self.comic.title, "<", self.comic.url, ">");
        });
      } else { // Existing Comic
        self.comic = comic;
        if (self.title !== self.comic.title) {
          self.comic.updateProperties({ title: self.title });
        }
        if (self.thumbnailUrl !== self.comic.thumbnailUrl) {
          self.comic.updateProperties({ thumbnailUrl: self.thumbnailUrl });
        }
        self.comic.save((err) => {
          if (err) { throw err; }
          console.log("Updated new comic:", self.comic.title, "<", self.comic.url, ">");
        });
      }

      self.episodes.forEach((episode) => {
        geddy.model.Episode.first({ comicId: self.comic.id, number: episode.num }, (err, epobj) => {
          if (err) { throw err; }

          if (!epobj) { // New Episode: Add to DB
            epobj = geddy.model.Episode.create({
              name: episode.name,
              number: episode.num,
              subTitle: episode.subTitle,
              url: episode.url,
              publishedAt: (episode.publishedAt) ? episode.publishedAt : moment().toDate(),
              comicId: self.comic.id
            });

            epobj.save((err) => {
              if (err) {
                throw err;
              }
            });

            // Register relation between user and episode
            self.comic.getUsers((err, users) => {
              for (const i = 0 in users) {
                users[i].connectEpisodes(epobj);
              }
            });
            // TODO Alert it to the users
          } else { // Existing Episode: Update if something updated
            let properties : any = {
              name: episode.name,
              number: episode.num,
              subTitle: episode.subTitle,
              url: episode.url,
              comicId: self.comic.id
            }

            if (episode.publishedAt) {
              properties.publishedAt = episode.publishedAt;
            }

            epobj.updateProperties(properties);
            epobj.save((err) => {
              if (err) { throw err; }
            });
          }
        });
      });
    });
  }

  analyzeAndSave(): void {
    const self = this;

    self.analyze(() => {
      self.save();
    });
  }

  remove() : void {
    const self = this;

    geddy.model.Comic.first({ url : self.url }, (err, comic) => {
      if (comic) {
        geddy.model.Episode.remove({ comicId : comic.id }, (err, success) => {
          geddy.model.Comic.remove(comic.id, (err, data) => {
            console.log("Removed concluded comic and its episodes:", self.title, "<", self.url, ">");
          });
        });
      }
    });
  }
}
