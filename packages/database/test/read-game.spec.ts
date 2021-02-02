import * as firebase from "@firebase/rules-unit-testing";
import {
  createConnection, DATABASE,
  getAuthedDatabase,
  reinitializeDatabase
} from "./utils";
import {DEFAULT_BOARD_DIMENSIONS, RTDBPaths} from "@pipeline/common";


const PROJECT_ID = "database-emulator-example-" + Math.floor(Math.random() * 1000);

const COVERAGE_URL = `http://${process.env.FIREBASE_DATABASE_EMULATOR_HOST}/emulator/v1/projects/${PROJECT_ID}:ruleCoverage.html`;

const GAME_ID = 'randomGameId';

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

describe("Game read", () => {

  it("should not allow game read if not authenticated", async () => {
    const db = getAuthedDatabase(PROJECT_ID, undefined);
    await firebase.assertFails(db.ref(`/${RTDBPaths.Games}/${GAME_ID}`).once('value'));
  });

  it("should not allow game read if authenticated but not connected", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    await adminDatabase.ref(`/${RTDBPaths.Games}/${GAME_ID}`).set({
      scenarioTitle: 'Title',
      scenarioContent: 'Content',
      scenarioCardId: null,
      facilitator: {
        id: userUID
      },
      createdAt: 535435345,
      deckId: '7p5qqvE8kCV9WWysVc2n',
      review: false,
      boardDimensions: DEFAULT_BOARD_DIMENSIONS
    });
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    await firebase.assertFails(db.ref(`/${RTDBPaths.Games}/${GAME_ID}`).once('value'));
  });

  it("should allow game read if authenticated and connected", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    await adminDatabase.ref(`/${RTDBPaths.Games}/${GAME_ID}`).set({
      scenarioTitle: 'Title',
      scenarioContent: 'Content',
      scenarioCardId: null,
      facilitator: {
        id: userUID
      },
      createdAt: 535435345,
      deckId: '7p5qqvE8kCV9WWysVc2n',
      review: false,
      boardDimensions: DEFAULT_BOARD_DIMENSIONS
    });
    await createConnection(GAME_ID, userUID, adminDatabase);
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    await firebase.assertSucceeds(db.ref(`/${RTDBPaths.Games}/${GAME_ID}`).once('value'));
  });

});
