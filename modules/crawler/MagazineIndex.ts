import { JSDOM } from "jsdom";
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
      const document = (await JSDOM.fromURL(opt.url)).window.document;

      return self.analyzeComics(document);
    } catch (err) {
      console.error(err);
    }
  }
}
