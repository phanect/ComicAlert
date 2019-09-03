import { Episode } from "./Episode";

export interface Comic {
  url: string;
  title: string;
  thumbnailURL: string;
  episodes: Episode[];
  concluded: boolean;
  magazineID: string;
}
