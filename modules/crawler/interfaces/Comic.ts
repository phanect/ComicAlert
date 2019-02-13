import * as cheerio from "cheerio";
import fetch from "node-fetch";

export class ComicPage {
  comic : any;
  title : string;
  thumbnailUrl : string;
  episodes : Array<any> = new Array();
  concluded : boolean = false;

  constructor(public url : string) {

  }
}
