import { Comic } from "./Comic";

export interface Magazine {
  id: string;
  name: string;
  comics: Comic[];
}
