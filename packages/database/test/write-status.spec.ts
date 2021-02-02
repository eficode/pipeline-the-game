import * as firebase from "@firebase/rules-unit-testing";
import {createGame, DATABASE, getAuthedDatabase, reinitializeDatabase} from "./utils";
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

describe("Status write", () => {

  it("should not allow status write if not authenticated", async () => {
    const userUID = 'id1';
    const db = getAuthedDatabase(PROJECT_ID, undefined);
    await firebase.assertFails(db.ref(`/${RTDBPaths.Statuses}/${GAME_ID}/${userUID}`).set({lastOnline: firebase.database.ServerValue.TIMESTAMP}));
  });

  it("should not allow status write if authenticated but not existing game", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    await firebase.assertFails(db.ref(`/${RTDBPaths.Statuses}/${GAME_ID}/${userUID}`).set({lastOnline: firebase.database.ServerValue.TIMESTAMP}));
  });

  it("should allow status write if authenticated and existing game and lastOnline is now", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    await createGame(GAME_ID, adminDatabase);
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    await firebase.assertSucceeds(db.ref(`/${RTDBPaths.Statuses}/${GAME_ID}/${userUID}`).set({lastOnline: firebase.database.ServerValue.TIMESTAMP}));
  });

  it("should not allow status write if authenticated and existing game but lastOnline is not now", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    await createGame(GAME_ID, adminDatabase);
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    await firebase.assertFails(db.ref(`/${RTDBPaths.Statuses}/${GAME_ID}/${userUID}`).set({something: 25255}));
  });

  it("should not allow status write if authenticated and existing game but not lastOnline", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    await createGame(GAME_ID, adminDatabase);
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    await firebase.assertFails(db.ref(`/${RTDBPaths.Statuses}/${GAME_ID}/${userUID}`).set({something: 355353}));
  });
});
