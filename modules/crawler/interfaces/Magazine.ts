import * as cheerio from "cheerio";
import fetch from "node-fetch";

export class MagazineIndex {
  comicUrls : Array<string> = new Array();

  constructor(public url: string, private name: string) {
    console.log("Analyzing Magazine:", this.name, "<", this.url, ">");
  }

  async analyzeComics($ : any) : Promise<void> {
    throw new Error("This method must be overrided. Aren't you using MagazineIndex class directly?");
  }

  private async analyze(): Promise<void> {
    const self = this;

    try {
      const res = await fetch(self.url),
            html = await res.text(),
            $ = cheerio.load(html);

      if (res.status !== 200) {
        throw new Error("Return status code " + res.status);
      }

      return self.analyzeComics($);
    } catch (err) {
      console.error(err);
    }
  }
}
