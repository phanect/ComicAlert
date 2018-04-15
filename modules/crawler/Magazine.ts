import { MagGardenComic } from "./MagGardenComic";
import { getDOMWindow } from "./utils";

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

    self.analyzeComics(await getDOMWindow(self.url), () => {
      self.save();
    });
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
