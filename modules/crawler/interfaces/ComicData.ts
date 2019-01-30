import { EpisodeData } from "./EpisodeData"

export interface ComicData {
  url: string;
  title: string;
  thumbnailURL: string;
  episodes: EpisodeData[];
  concluded: boolean;
}
