import * as firebase from "@firebase/rules-unit-testing";
import {getAuthedFirestore, reinitializeFirestore} from "./utils";
import {FirebaseCollection, FirebaseDoc} from '@pipeline/common/build/cjs';

const PROJECT_ID = "firestore-emulator-example-" + Math.floor(Math.random() * 1000);

const COVERAGE_URL = `http://${process.env.FIRESTORE_EMULATOR_HOST}/emulator/v1/projects/${PROJECT_ID}:ruleCoverage.html`;

const GAME_ID = 'randomId';

beforeEach(async () => {
  await reinitializeFirestore(PROJECT_ID);
});

after(async () => {
  await Promise.all(firebase.apps().map((app) => app.delete()));
  console.log(`View firestore rule coverage information at ${COVERAGE_URL}\n`);
});

describe("Dynamic data devops maturities read", () => {

  it("should allow devops maturities read if not authenticated", async () => {
    const db = getAuthedFirestore(PROJECT_ID, undefined);
    const gameRolesRef = db.collection(FirebaseCollection.DynamicData).doc(FirebaseDoc.DevOpsMaturities);
    await firebase.assertSucceeds(gameRolesRef.get());
  });

  it("should allow devops maturities read if authenticated but email not verified", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    const db = getAuthedFirestore(PROJECT_ID, {uid: userUID, email, email_verified: false});
    const gameRolesRef = db.collection(FirebaseCollection.DynamicData).doc(FirebaseDoc.DevOpsMaturities);
    await firebase.assertSucceeds(gameRolesRef.get());
  });

  it("should allow devops maturities read if authenticated and email verified", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    const db = getAuthedFirestore(PROJECT_ID, {uid: userUID, email, email_verified: true});
    const gameRolesRef = db.collection(FirebaseCollection.DynamicData).doc(FirebaseDoc.DevOpsMaturities);
    await firebase.assertSucceeds(gameRolesRef.get());
  });

});
