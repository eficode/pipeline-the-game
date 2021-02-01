import * as firebase from "@firebase/rules-unit-testing";
import {createConnection, createGame, getAdminDatabase, getAuthedDatabase, reinitializeDatabase} from "./utils";
import {DEFAULT_BOARD_DIMENSIONS, RTDBPaths} from "@pipeline/common";
import fb from "firebase";

const PROJECT_ID = "firestore-emulator-example-" + Math.floor(Math.random() * 1000);

const COVERAGE_URL = `http://${process.env.FIREBASE_DATABASE_EMULATOR_HOST}/emulator/v1/projects/${PROJECT_ID}:ruleCoverage.html`;

const GAME_ID = 'randomGameId';
const CARD_ID = 'cardId';


beforeEach(async () => {
  await reinitializeDatabase(PROJECT_ID);
});

after(async () => {
  await Promise.all(firebase.apps().map((app) => app.delete()));
  console.log(`View firestore rule coverage information at ${COVERAGE_URL}\n`);
});

describe("Card read", () => {

  it("should not allow card read if not authenticated", async () => {
    const db = getAuthedDatabase(PROJECT_ID, undefined);
    await firebase.assertFails(db.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).once('value'));
  });

  it("should not allow card read if authenticated but not connected", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    const adminDb = getAdminDatabase();
    await adminDb.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).set({
      parent: 'board',
      position: {
        x: 20,
        y: 26
      },
      lockedBy: null,
      estimation: '',
    });
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    await firebase.assertFails(db.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).once('value'));
  });

  it("should allow card read if authenticated and connected and game exists", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    const adminDb = getAdminDatabase();
    await adminDb.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).set({
      parent: 'board',
      position: {
        x: 20,
        y: 26
      },
      lockedBy: null,
      estimation: '',
    });
    await createGame(GAME_ID);
    await createConnection(GAME_ID, userUID);
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    await firebase.assertSucceeds(db.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).once('value'));
  });



});
