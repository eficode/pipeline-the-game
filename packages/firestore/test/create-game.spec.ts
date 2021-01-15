import * as firebase from "@firebase/rules-unit-testing";
import {getAuthedFirestore, reinitializeFirestore} from "./utils";
import {FirebaseCollection} from '@pipeline/common/build/cjs'
import {Card, Game} from "@pipeline/common";
import fb from "firebase";

const PROJECT_ID = "firestore-emulator-example-" + Math.floor(Math.random() * 1000);

const COVERAGE_URL = `http://${process.env.FIRESTORE_EMULATOR_HOST}/emulator/v1/projects/${PROJECT_ID}:ruleCoverage.html`;

beforeEach(async () => {
  await reinitializeFirestore(PROJECT_ID);
});

after(async () => {
  await Promise.all(firebase.apps().map((app) => app.delete()));
  console.log(`View firestore rule coverage information at ${COVERAGE_URL}\n`);
});

describe("Game create", () => {

  it("should not allow game creation if not authenticated", async () => {
    const db = getAuthedFirestore(PROJECT_ID, undefined);
    const gameRef = db.collection(FirebaseCollection.Games).doc('game1');
    await firebase.assertFails(gameRef.set({
      scenarioTitle: 'Title',
      scenarioContent: 'Content',
      scenarioCardId: null,
      facilitator: {
        id: 'id1'
      },
      createdAt: fb.firestore.FieldValue.serverTimestamp(),
      deckId: '7p5qqvE8kCV9WWysVc2n'
    } as Game));
  });

  it("should allow game creation with correct data", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    const db = getAuthedFirestore(PROJECT_ID, {uid: userUID, email, email_verified: true});
    const gameRef = db.collection(FirebaseCollection.Games).doc('game1');
    await firebase.assertSucceeds(gameRef.set({
      scenarioTitle: 'Title',
      scenarioContent: 'Content',
      scenarioCardId: null,
      facilitator: {
        id: userUID
      },
      createdAt: fb.firestore.FieldValue.serverTimestamp(),
      deckId: '7p5qqvE8kCV9WWysVc2n'
    } as Game));
  });

  it("should not allow game creation with invalid deckId", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    const db = getAuthedFirestore(PROJECT_ID, {uid: userUID, email, email_verified: true});
    const gameRef = db.collection(FirebaseCollection.Games).doc('game1');
    await firebase.assertFails(gameRef.set({
      scenarioTitle: 'Title',
      scenarioContent: 'Content',
      scenarioCardId: null,
      facilitator: {
        id: userUID
      },
      createdAt: fb.firestore.FieldValue.serverTimestamp(),
      deckId: 'randomDeckId'
    } as Game));
  });

  it("should not allow game creation without all necessary keys", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    const db = getAuthedFirestore(PROJECT_ID, {uid: userUID, email, email_verified: true});
    const gameRef = db.collection(FirebaseCollection.Games).doc('game1');
    await firebase.assertFails(gameRef.set({
      scenarioTitle: 'Title',
      scenarioCardId: null,
      facilitator: {
        id: userUID
      },
      createdAt: fb.firestore.FieldValue.serverTimestamp(),
      deckId: '7p5qqvE8kCV9WWysVc2n'
    }));
  });

  it("should not allow game creation if the authenticated user is different from facilitator", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    const db = getAuthedFirestore(PROJECT_ID, {uid: userUID, email, email_verified: true});
    const gameRef = db.collection(FirebaseCollection.Games).doc('game1');
    await firebase.assertFails(gameRef.set({
      scenarioTitle: 'Title',
      scenarioContent: 'Content',
      scenarioCardId: null,
      facilitator: {
        id: 'randomUserId'
      },
      createdAt: fb.firestore.FieldValue.serverTimestamp(),
      deckId: '7p5qqvE8kCV9WWysVc2n'
    } as Game));
  });

  it("should not allow game creation if createdAt is not server timestamp", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    const db = getAuthedFirestore(PROJECT_ID, {uid: userUID, email, email_verified: true});
    const gameRef = db.collection(FirebaseCollection.Games).doc('game1');
    await firebase.assertFails(gameRef.set({
      scenarioTitle: 'Title',
      scenarioContent: 'Content',
      scenarioCardId: null,
      facilitator: {
        id: userUID
      },
      createdAt: fb.firestore.Timestamp.now(),
      deckId: '7p5qqvE8kCV9WWysVc2n'
    } as Game));
  });

  it("should not allow game creation if the scenario title is too long", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    const db = getAuthedFirestore(PROJECT_ID, {uid: userUID, email, email_verified: true});
    const gameRef = db.collection(FirebaseCollection.Games).doc('game1');
    await firebase.assertFails(gameRef.set({
      scenarioTitle: 'x'.repeat(100),
      scenarioContent: 'Content',
      scenarioCardId: null,
      facilitator: {
        id: userUID
      },
      createdAt: fb.firestore.FieldValue.serverTimestamp(),
      deckId: '7p5qqvE8kCV9WWysVc2n'
    } as Game));
  });

  it("should not allow game creation if the scenario content is too long", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    const db = getAuthedFirestore(PROJECT_ID, {uid: userUID, email, email_verified: true});
    const gameRef = db.collection(FirebaseCollection.Games).doc('game1');
    await firebase.assertFails(gameRef.set({
      scenarioTitle: 'Title',
      scenarioContent: 'x'.repeat(3000),
      scenarioCardId: null,
      facilitator: {
        id: userUID
      },
      createdAt: fb.firestore.FieldValue.serverTimestamp(),
      deckId: '7p5qqvE8kCV9WWysVc2n'
    } as Game));
  });

  it("should allow game creation if the scenario card id is present and coherent", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    const scenarioId = 'G5JfGVoM7SZ6jOsdjWWp';
    const db = getAuthedFirestore(PROJECT_ID, {uid: userUID, email, email_verified: true});
    const scenarioCardDoc = await db.doc(`${FirebaseCollection.Cards}/${scenarioId}`).get();
    const scenarioCard = scenarioCardDoc.data() as Card;
    const gameRef = db.collection(FirebaseCollection.Games).doc('game1');
    await firebase.assertSucceeds(gameRef.set({
      scenarioTitle: scenarioCard.title,
      scenarioContent: scenarioCard.content,
      scenarioCardId: scenarioId,
      facilitator: {
        id: userUID
      },
      createdAt: fb.firestore.FieldValue.serverTimestamp(),
      deckId: '7p5qqvE8kCV9WWysVc2n'
    } as Game));
  });

  it("should not allow game creation if the scenario card id is present but not coherent", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    const scenarioId = 'G5JfGVoM7SZ6jOsdjWWp';
    const db = getAuthedFirestore(PROJECT_ID, {uid: userUID, email, email_verified: true});
    const scenarioCardDoc = await db.doc(`${FirebaseCollection.Cards}/${scenarioId}`).get();
    const scenarioCard = scenarioCardDoc.data() as Card;
    const gameRef = db.collection(FirebaseCollection.Games).doc('game1');
    await firebase.assertFails(gameRef.set({
      scenarioTitle: scenarioCard.title,
      scenarioContent: 'random',
      scenarioCardId: scenarioId,
      facilitator: {
        id: userUID
      },
      createdAt: fb.firestore.FieldValue.serverTimestamp(),
      deckId: '7p5qqvE8kCV9WWysVc2n'
    } as Game));
  });

});
