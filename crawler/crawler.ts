import * as admin from "firebase-admin";
import { Magazine } from "./Magazine";
import { MagGarden } from "./MagGarden";

const app = admin.initializeApp({
    credential: admin.credential.cert(
      require("/home/phanect/.credentials/comicstand/firebase-admin-privatekey.json")
    ),
    databaseURL: "https://comic-stand.firebaseio.com",
  }),
  auth = app.auth(),
  db = app.firestore();

db.settings({
  timestampsInSnapshots: true,
});

function save(magazines: Magazine[]) {
  for (const magazine of magazines) {
    db.collection("magazines")
      .doc(magazine.ID)
      .set(magazine.toJSON());

    for (const comic of magazine.comics) {
      db.collection("comics")
        .doc()
        .set(comic.toJSON());
    }
  }
}

async function analyze() {
  const magGarden = new MagGarden();

  await magGarden.crawl();
  save(magGarden.Magazines);
}

// TODO remove all comic data before analysis so that apply code changes
analyze();
