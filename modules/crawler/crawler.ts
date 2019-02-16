import { writeFile, ensureDir } from "fs-extra";
import { publish } from "gh-pages";
import { join } from "path";

import { MagGarden } from "./MagGarden";

(async () => {
  const jsonDir = join(__dirname, "dist"),
        magGarden = new MagGarden();

  await magGarden.crawl();

  await ensureDir(jsonDir);
  await Promise.all([
    writeFile(join(jsonDir, "CNAME"), "api.comicstand.phanective.org"),
    writeFile(join(jsonDir, "comics.json"), JSON.stringify(magGarden.Magazines)),
  ]);

  return new Promise((resolve, reject) => {
    publish("dist", {
      repo: "git@github.com:phanect/static-comicstand-data.git",
    }, (err: Error) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
})();
