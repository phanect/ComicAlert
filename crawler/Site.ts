import { Magazine } from "./Magazine";
import { Comic } from "./Comic";

export abstract class Site {
  protected magazines: Magazine[] = [];
  protected comics: Comic[] = [];
  protected configs: {
    /** ID of the magazine */
    id: string;
    /** Name of the managize */
    name: string;
    /** Target URLs to scrape */
    urls: string[];
  }[];

  get Magazines(): Magazine[] {
    return this.magazines;
  }
  get Comics() {
    return this.comics;
  }

  public async crawl() {
    for (const config of this.configs) {
      for (const url of config.urls) {
        await this.analyzeMagazinePage(url, config.name, config.id);
      }
    }
  }

  protected abstract async analyzeMagazinePage(
    url: string,
    name: string,
    id: string
  ): Promise<any>;
}
