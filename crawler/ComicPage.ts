/// <reference path="../lib/external/DefinitelyTyped/node/node.d.ts" />
/// <reference path="../lib/commons.ts" />

var cheerio = require("cheerio");
var moment = require("moment");
var request = require("request");

require("../lib/commons");

export class ComicPage {
  comic : any;
  title : string;
  thumbnailUrl : string;
  episodes : Array<any> = new Array();
  concluded : boolean = false;

  constructor(public url : string) {

  }

  scrapeTitle($: any): void {
    throw new Error("This method must be overrided. Aren't you using ComicPage class directly?");
  }

  scrapeThumbnailUrl($: any): void {
    throw new Error("This method must be overrided. Aren't you using ComicPage class directly?");
  }

  scrapeEpisodes($: any): void {
    throw new Error("This method must be overrided. Aren't you using ComicPage class directly?");
  }

  analyze(cb : any) : void {
    var self = this;

    request({ url: self.url, jar: true }, function(err, response, html) {
      if (response && response.statusCode !== 200) {
        throw new Error("Return status code " + response.statusCode);
      } else if (err) {
        throw err;
      }

      var $ = cheerio.load(html);

      self.scrapeTitle($);
      self.scrapeThumbnailUrl($);
      self.scrapeEpisodes($);

      cb();
    });
  }
  
  save() : void {
    var self = this;

    if (this.concluded) {
      self.remove();
      return;
    }

    geddy.model.Comic.first({ url: self.url }, function(err, comic) {
      if (err) { throw err; }

      if (!comic) { // New Comic
        self.comic = geddy.model.Comic.create({
          title: self.title,
          url: self.url,
          thumbnailUrl: self.thumbnailUrl
        });
        self.comic.save(function(err, comic) {
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
        self.comic.save(function(err) {
          if (err) { throw err; }
          console.log("Updated new comic:", self.comic.title, "<", self.comic.url, ">");
        });
      }

      self.episodes.forEach(function(episode) {
        geddy.model.Episode.first({ comicId: self.comic.id, number: episode.num }, function(err, epobj) {
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

            epobj.save(function(err) {
              if (err) {
                throw err;
              }
            });

            // Register relation between user and episode
            self.comic.getUsers(function(err, users) {
              for (var i = 0 in users) {
                users[i].connectEpisodes(epobj);
              }
            });
            // TODO Alert it to the users
          } else { // Existing Episode: Update if something updated
            var properties : any = {
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
            epobj.save(function(err) {
              if (err) { throw err; }
            });
          }
        });
      });
    });
  }

  analyzeAndSave(): void {
    var self = this;
    self.analyze(function() {
      self.save();
    });
  }

  remove() : void {
    var self = this;
    geddy.model.Comic.first({ url : self.url }, function(err, comic) {
      if (comic) {
        geddy.model.Episode.remove({ comicId : comic.id }, function(err, success) {
          geddy.model.Comic.remove(comic.id, function(err, data) {
            console.log("Removed concluded comic and its episodes:", self.title, "<", self.url, ">");
          });
        });
      }
    });
  }
}
