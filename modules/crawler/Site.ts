import { Magazine } from "./interfaces/Magazine";
import { Comic } from "./interfaces/Comic";

export abstract class Site {
  protected magazines: Magazine[] = [];
  protected comics: Comic[] = [];
  protected configs: {
    /** ID of the magazine. */
    id: string;
    /** Name of the managize. */
    name: string;
    /** Target URLs to scrape. */
    urls: string[];
  }[];

  public get Magazines(): Magazine[] {
    return this.magazines;
  }
  public get Comics(): Comic[] {
    return this.comics;
  }

  public async crawl(): Promise<void> {
    for (const config of this.configs) {
      for (const url of config.urls) {
        this.magazines.push(
          await this.analyzeMagazinePage(url, config.name, config.id)
        );
      }
    }
  }

  protected abstract async analyzeMagazinePage(
    url: string,
    name: string,
    id: string
  ): Promise<Magazine>;
}
