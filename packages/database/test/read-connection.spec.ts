import * as firebase from "@firebase/rules-unit-testing";
import {DATABASE, getAuthedDatabase, reinitializeDatabase} from "./utils";
import {RTDBPaths} from "@pipeline/common";

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

describe("Connection read", () => {

  it("should not allow connection read if not authenticated", async () => {
    const userUID = 'id1';
    const db = getAuthedDatabase(PROJECT_ID, undefined);
    const ref = db.ref(`/${RTDBPaths.Connections}/${GAME_ID}/${userUID}`).push();
    await firebase.assertFails(ref.once('value'));
  });

  it("should not allow connection read if authenticated", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    const ref = db.ref(`/${RTDBPaths.Connections}/${GAME_ID}/${userUID}`).push();
    await firebase.assertFails(ref.once('value'));
  });
});
