import { writeFile, ensureDir } from "fs-extra";
import { publish } from "gh-pages";
import { join } from "path";

import { MagazineData } from "./interfaces/MagazineData";
import { MagGarden } from "./MagGarden";

(async () => {
  const jsonDir = join(__dirname, "dist"),
        magGarden = new MagGarden();
  let magazines: MagazineData[] = [];

  await magGarden.crawl();
  magazines = magazines.concat(magGarden.Magazines.map(magazine => magazine.toJSON()));

  await ensureDir(jsonDir);
  await Promise.all([
    writeFile(join(jsonDir, "CNAME"), "api.comicstand.phanective.org"),
    writeFile(join(jsonDir, "comics.json"), JSON.stringify(magazines))
  ]);

  return new Promise((resolve, reject) => {
    publish("dist", {
      repo: "git@github.com:phanect/static-comicstand-data.git",
    }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
})();
