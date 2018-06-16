import { join } from "path";

import { MagGarden } from "./MagGarden";

(async () => {
  const jsonDir = join(__dirname, "dist"),
        magGarden = new MagGarden();

  await magGarden.crawl();

})();
