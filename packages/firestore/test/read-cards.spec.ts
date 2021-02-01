import * as firebase from "@firebase/rules-unit-testing";
import {getAuthedFirestore, reinitializeFirestore} from "./utils";
import {FirebaseCollection} from '@pipeline/common/build/cjs';

const PROJECT_ID = "firestore-emulator-example-" + Math.floor(Math.random() * 1000);

const COVERAGE_URL = `http://${process.env.FIRESTORE_EMULATOR_HOST}/emulator/v1/projects/${PROJECT_ID}:ruleCoverage.html`;

beforeEach(async () => {
  await reinitializeFirestore(PROJECT_ID);
});

after(async () => {
  await Promise.all(firebase.apps().map((app) => app.delete()));
  console.log(`View firestore rule coverage information at ${COVERAGE_URL}\n`);
});

describe("Cards read", () => {

  it("should not allow cards read if not authenticated", async () => {
    const db = getAuthedFirestore(PROJECT_ID, undefined);
    const cardsRef = db.collection(FirebaseCollection.Cards);
    await firebase.assertFails(cardsRef.get());
  });

  it("should not allow cards read if authenticated but email not verified", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    const db = getAuthedFirestore(PROJECT_ID, {uid: userUID, email, email_verified: false});
    const cardsRef = db.collection(FirebaseCollection.Cards);
    await firebase.assertFails(cardsRef.get());
  });

  it("should allow deck cards if authenticated and email verified", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    const db = getAuthedFirestore(PROJECT_ID, {uid: userUID, email, email_verified: true});
    const cardsRef = db.collection(FirebaseCollection.Cards);
    await firebase.assertSucceeds(cardsRef.get());
  });

});
