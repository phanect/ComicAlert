import { MagGardenMagazineIndex } from "./MagGardenMagazineIndex";

async function analyze() : Promise<void> {
  let magazines = [];

  magazines.push(new MagGardenMagazineIndex("http://comic.mag-garden.co.jp/blade/", "ブレイドオンライン"));
  magazines.push(new MagGardenMagazineIndex("http://comic.mag-garden.co.jp/eden/", "WEB コミック EDEN"));
  magazines.push(new MagGardenMagazineIndex("http://comic.mag-garden.co.jp/beats/", "WEBコミック Beat's"));

  for(const magazine of magazines) {
    const result = await magazine.analyze();
  }
};

// TODO remove all comic data before analysis so that apply code changes
analyze();
