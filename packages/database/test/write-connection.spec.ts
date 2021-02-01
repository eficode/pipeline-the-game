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

describe("Connection write", () => {

  it("should not allow connection creation if not authenticated", async () => {
    const userUID = 'id1';
    const db = getAuthedDatabase(PROJECT_ID, undefined);
    const ref = db.ref(`/${RTDBPaths.Connections}/${GAME_ID}/${userUID}`).push();
    await firebase.assertFails(ref.set({updatedAt: fb.database.ServerValue.TIMESTAMP}));
  });

  it("should not allow connection creation if authenticated but not existing game", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    const ref = db.ref(`/${RTDBPaths.Connections}/${GAME_ID}/${userUID}`).push();
    await firebase.assertFails(ref.set({updatedAt: fb.database.ServerValue.TIMESTAMP}));
  });

  it("should allow connection creation if authenticated and existing game", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    const adminDb = getAdminDatabase();
    await adminDb.ref(`/${RTDBPaths.Games}/${GAME_ID}`).set({something: 's'});
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    const ref = db.ref(`/${RTDBPaths.Connections}/${GAME_ID}/${userUID}`).push();
    await firebase.assertSucceeds(ref.set({updatedAt: fb.database.ServerValue.TIMESTAMP}));
  });

  it("should not allow connection creation if authenticated and existing game but not updatedAt", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    const adminDb = getAdminDatabase();
    await adminDb.ref(`/${RTDBPaths.Games}/${GAME_ID}`).set({something: 's'});
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    const ref = db.ref(`/${RTDBPaths.Connections}/${GAME_ID}/${userUID}`).push();
    await firebase.assertFails(ref.set({somethingElse: fb.database.ServerValue.TIMESTAMP}));
  });

  it("should allow connection deletion if authenticated and existing game", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    const connectionId = 'connectionId';
    const adminDb = getAdminDatabase();
    await adminDb.ref(`/${RTDBPaths.Games}/${GAME_ID}`).set({something: 's'});
    await adminDb.ref(`/${RTDBPaths.Connections}/${GAME_ID}/${userUID}/${connectionId}`).set({updatedAt: fb.database.ServerValue.TIMESTAMP});
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    await firebase.assertSucceeds(db.ref(`/${RTDBPaths.Connections}/${GAME_ID}/${userUID}/${connectionId}`).remove());
  });
});
