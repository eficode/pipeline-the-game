import * as firebase from "@firebase/rules-unit-testing";
import {getAdminDatabase, getAuthedDatabase, reinitializeDatabase} from "./utils";
import {RTDBPaths} from "@pipeline/common";
import fb from "firebase";

const PROJECT_ID = "firestore-emulator-example-" + Math.floor(Math.random() * 1000);

const COVERAGE_URL = `http://${process.env.FIREBASE_DATABASE_EMULATOR_HOST}/emulator/v1/projects/${PROJECT_ID}:ruleCoverage.html`;

const GAME_ID = 'randomGameId';


beforeEach(async () => {
  await reinitializeDatabase(PROJECT_ID);
});

after(async () => {
  await Promise.all(firebase.apps().map((app) => app.delete()));
  console.log(`View firestore rule coverage information at ${COVERAGE_URL}\n`);
});

describe("Status read", () => {

  it("should not allow status read if not authenticated", async () => {
    const userUID = 'id1';
    const db = getAuthedDatabase(PROJECT_ID, undefined);
    const ref = db.ref(`/${RTDBPaths.Statuses}/${GAME_ID}/${userUID}`);
    await firebase.assertFails(ref.once('value'));
  });

  it("should not allow status read if authenticated", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    const ref = db.ref(`/${RTDBPaths.Statuses}/${GAME_ID}/${userUID}`);
    await firebase.assertFails(ref.once('value'));
  });
});
