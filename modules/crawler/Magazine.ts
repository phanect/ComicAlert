import { MagazineData } from "./interfaces/MagazineData";
import { Comic } from "./Comic";

export class Magazine {
  comics: Comic[] = [];

  public get ID() {
    return this.id;
  }

  constructor(private name: string, private id: string) {
  }

  public toJSON(): MagazineData {
    return {
      name: this.name,
      comics: this.comics.map(comic => comic.toJSON()),
    };
  }
}
