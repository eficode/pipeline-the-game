import * as firebase from "@firebase/rules-unit-testing";
import {
  createConnection,
  createGame, DATABASE,
  getAuthedDatabase,
  reinitializeDatabase
} from "./utils";
import {RTDBPaths} from "@pipeline/common";

const PROJECT_ID = "database-emulator-example-" + Math.floor(Math.random() * 1000);

const COVERAGE_URL = `http://${process.env.FIREBASE_DATABASE_EMULATOR_HOST}/emulator/v1/projects/${PROJECT_ID}:ruleCoverage.html`;

const GAME_ID = 'randomGameId';
const CARD_ID = 'cardId';

type Database = ReturnType<typeof firebase.database>;
let adminDatabase: Database;
let adminApp: ReturnType<typeof firebase.initializeAdminApp>;

before(async () => {
  adminApp = firebase.initializeAdminApp({databaseName: DATABASE, projectId: PROJECT_ID});
  adminDatabase = adminApp.database();
});

beforeEach(async () => {
  await reinitializeDatabase(PROJECT_ID, adminDatabase);
});

after(async () => {
  try {
    await Promise.all(firebase.apps().map((app) => app.delete()));
    await adminApp.delete();
  } catch (e) {
    console.error(e);
  }
  console.log(`View database rule coverage information at ${COVERAGE_URL}\n`);
});

describe("Card read", () => {

  it("should not allow card read if not authenticated", async () => {
    const db = getAuthedDatabase(PROJECT_ID, undefined);
    await firebase.assertFails(db.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).once('value'));
  });

  it("should not allow card read if authenticated but not connected", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    await adminDatabase.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).set({
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
    await adminDatabase.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).set({
      parent: 'board',
      position: {
        x: 20,
        y: 26
      },
      lockedBy: null,
      estimation: '',
    });
    await createGame(GAME_ID, adminDatabase);
    await createConnection(GAME_ID, userUID, adminDatabase);
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    await firebase.assertSucceeds(db.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).once('value'));
  });

  it("should allow cards read if authenticated and connected and game exists", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    await adminDatabase.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).set({
      parent: 'board',
      position: {
        x: 20,
        y: 26
      },
      lockedBy: null,
      estimation: '',
    });
    await createGame(GAME_ID, adminDatabase);
    await createConnection(GAME_ID, userUID, adminDatabase);
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    await firebase.assertSucceeds(db.ref(`/${RTDBPaths.Cards}/${GAME_ID}`).once('value'));
  });

  it("should not allow cards read if authenticated but not connected", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    await adminDatabase.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).set({
      parent: 'board',
      position: {
        x: 20,
        y: 26
      },
      lockedBy: null,
      estimation: '',
    });
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    await firebase.assertFails(db.ref(`/${RTDBPaths.Cards}/${GAME_ID}`).once('value'));
  });

});
