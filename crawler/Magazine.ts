import { Comic } from "./Comic";

export class Magazine {
  comics: Comic[] = [];

  public get ID() {
    return this.id;
  }

  constructor(private name: string, private id: string) {
  }

  public toJSON() {
    return {
      name: this.name,
    };
  }
}
