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

describe("Connection write", () => {

  it("should not allow connection creation if not authenticated", async () => {
    const userUID = 'id1';
    const db = getAuthedDatabase(PROJECT_ID, undefined);
    const ref = db.ref(`/${RTDBPaths.Connections}/${GAME_ID}/${userUID}`).push();
    await firebase.assertFails(ref.set({updatedAt: firebase.database.ServerValue.TIMESTAMP}));
  });

  it("should not allow connection creation if authenticated but not existing game", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    const ref = db.ref(`/${RTDBPaths.Connections}/${GAME_ID}/${userUID}`).push();
    await firebase.assertFails(ref.set({updatedAt: firebase.database.ServerValue.TIMESTAMP}));
  });

  it("should allow connection creation if authenticated and existing game", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    await adminDatabase.ref(`/${RTDBPaths.Games}/${GAME_ID}`).set({something: 's'});
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    const ref = db.ref(`/${RTDBPaths.Connections}/${GAME_ID}/${userUID}`).push();
    await firebase.assertSucceeds(ref.set({updatedAt: firebase.database.ServerValue.TIMESTAMP}));
  });

  it("should not allow connection creation if authenticated and existing game but not updatedAt", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    await adminDatabase.ref(`/${RTDBPaths.Games}/${GAME_ID}`).set({something: 's'});
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    const ref = db.ref(`/${RTDBPaths.Connections}/${GAME_ID}/${userUID}`).push();
    await firebase.assertFails(ref.set({somethingElse: firebase.database.ServerValue.TIMESTAMP}));
  });

  it("should allow connection deletion if authenticated and existing game", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    const connectionId = 'connectionId';
    await adminDatabase.ref(`/${RTDBPaths.Games}/${GAME_ID}`).set({something: 's'});
    await adminDatabase.ref(`/${RTDBPaths.Connections}/${GAME_ID}/${userUID}/${connectionId}`).set({updatedAt: firebase.database.ServerValue.TIMESTAMP});
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    await firebase.assertSucceeds(db.ref(`/${RTDBPaths.Connections}/${GAME_ID}/${userUID}/${connectionId}`).remove());
  });
});
