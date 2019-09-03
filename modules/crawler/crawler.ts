import { writeFile, ensureDir } from "fs-extra";
import { publish } from "gh-pages";
import { join } from "path";

import { MagGarden } from "./MagGarden";

(async () => {
  const jsonDir = join(__dirname, "dist");
  const magGarden = new MagGarden();

  console.info("Starting to crawl MagGarden...");
  await magGarden.crawl();

  await ensureDir(jsonDir);
  await Promise.all([
    writeFile(join(jsonDir, "CNAME"), "api.comicstand.phanective.org"),
    writeFile(join(jsonDir, "magazines-and-comics.json"), JSON.stringify(magGarden.Magazines)),
    writeFile(join(jsonDir, "comics.json"), JSON.stringify(magGarden.Comics)),
    writeFile(
      join(jsonDir, "magazines.json"),
      JSON.stringify(magGarden.Magazines.map(magazine => {
        delete magazine.comics;
        return magazine;
      }))
    ),
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
