import { MagGarden } from "./MagGarden";

async function analyze() {
  const magGarden = new MagGarden([
    "https://comic.mag-garden.co.jp/all/",
    "https://comic.mag-garden.co.jp/yomikiri/",
    "https://comic.mag-garden.co.jp/past/",
  ], "マッグガーデン");

  await magGarden.crawl();
}

// TODO remove all comic data before analysis so that apply code changes
analyze();
