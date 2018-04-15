import { DOMWindow, JSDOM } from "jsdom";
import fetch from "node-fetch";
import { MagGardenComic } from "./MagGardenComic";

export class Magazine {
  comicUrls : Array<string> = new Array();

  constructor(public url: string, private name: string) {
    console.log("Analyzing Magazine:", this.name, "<", this.url, ">");
  }

  analyzeComics($ : any, cb : any) : void {
    throw new Error("This method must be overrided. Aren't you using Magazine class directly?");
  }

  async analyzeAndSave() {
    const self = this;

    self.analyzeComics(await self.getDOMWindow(), () => {
      self.save();
    });
  }

  private async getDOMWindow(): Promise<DOMWindow> {
    const self = this;

    try {
      const res = await fetch(self.url);

      if (res.status !== 200) {
        throw new Error("Return status code " + res.status);
      }

      return new JSDOM(await res.text()).window;
    } catch (err) {
      console.error(err);
    }
  }

  private save() {
    if (!this.comicUrls || this.comicUrls.length <= 0) { throw new Error("comicUrls is empty."); }

    this.comicUrls.forEach((comicUrl) => {
      geddy.model.Comic.first({url : comicUrl}, (comic) => {
        if (!comic) {
          if (comicUrl.includes("comic.mag-garden.co.jp")) {
            new MagGardenComic(comicUrl).analyzeAndSave();
          }
        }
      });
    });
  }
}
