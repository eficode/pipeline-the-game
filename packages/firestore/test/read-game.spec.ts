import * as firebase from "@firebase/rules-unit-testing";
import {getAuthedFirestore, reinitializeFirestore} from "./utils";
import {FirebaseCollection, DEFAULT_BOARD_DIMENSIONS} from '@pipeline/common/build/cjs';

const PROJECT_ID = "firestore-emulator-example-" + Math.floor(Math.random() * 1000);

const COVERAGE_URL = `http://${process.env.FIRESTORE_EMULATOR_HOST}/emulator/v1/projects/${PROJECT_ID}:ruleCoverage.html`;

const GAME_ID = 'randomId';

beforeEach(async () => {
  await reinitializeFirestore(PROJECT_ID);
  const app = firebase.initializeAdminApp({projectId: PROJECT_ID});
  await app.firestore().collection(FirebaseCollection.Games).doc(GAME_ID).set({
    scenarioTitle: 'Title',
    scenarioContent: 'Content',
    scenarioCardId: null,
    facilitator: {
      id: 'randomFacilitatorId'
    },
    deckId: '7p5qqvE8kCV9WWysVc2n',
    rtdbInstance: null,
    cards: null,
    review: false,
    boardDimensions: DEFAULT_BOARD_DIMENSIONS
  });
});

after(async () => {
  await Promise.all(firebase.apps().map((app) => app.delete()));
  console.log(`View firestore rule coverage information at ${COVERAGE_URL}\n`);
});

describe("Game read", () => {

  it("should not allow game read if not authenticated", async () => {
    const db = getAuthedFirestore(PROJECT_ID, undefined);
    const gameRef = db.collection(FirebaseCollection.Games).doc(GAME_ID);
    await firebase.assertFails(gameRef.get());
  });

  it("should not allow game read if authenticated but email not verified", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    const db = getAuthedFirestore(PROJECT_ID, {uid: userUID, email, email_verified: false});
    const gameRef = db.collection(FirebaseCollection.Games).doc(GAME_ID);
    await firebase.assertFails(gameRef.get());
  });

  it("should allow game read if authenticated and email verified", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    const db = getAuthedFirestore(PROJECT_ID, {uid: userUID, email, email_verified: true});
    const gameRef = db.collection(FirebaseCollection.Games).doc(GAME_ID);
    await firebase.assertSucceeds(gameRef.get());
  });

});
