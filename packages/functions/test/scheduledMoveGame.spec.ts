import * as functions from "./function-index-test";
import * as testFactory from 'firebase-functions-test';
import * as chai from 'chai';
import {assert, expect} from 'chai';
import * as chaiAsPromised from 'chai-as-promised'
import * as admin from "firebase-admin";
import {DEFAULT_Z_INDEX, FirebaseCollection, RTDBPaths} from "@pipeline/common";
import * as firebase from "@firebase/rules-unit-testing";
import {Game} from "../src/models/Game";

chai.use(chaiAsPromised)

const test = testFactory();

describe("ScheduledMoveGame", () => {

  before(() => {
    admin.initializeApp();
  });

  beforeEach(() => {
    return Promise.all([
      firebase.clearFirestoreData({projectId: process.env.GCLOUD_PROJECT!}),
      admin.app().database(`https://pipeline-game-dev-default-rtdb.europe-west1.firebasedatabase.app`).ref().set(null)]);
  });

  after(() => {
    // Do cleanup tasks.
    test.cleanup();
    return Promise.all([firebase.clearFirestoreData({projectId: process.env.GCLOUD_PROJECT!}),
      admin.app().database(`https://pipeline-game-dev-default-rtdb.europe-west1.firebasedatabase.app`).ref().set(null),
      admin.apps.map(a => a?.delete())]);
  });

  it("should not move game with recent lastPlayerDisconnectedAt", async () => {
    await admin.firestore().doc(`${FirebaseCollection.Games}/gameId1`)
      .set({lastPlayerDisconnectedAt: admin.firestore.FieldValue.serverTimestamp()});
    await admin.app().database(`https://pipeline-game-dev-default-rtdb.europe-west1.firebasedatabase.app`).ref(`${RTDBPaths.Games}/gameId1`)
      .set({something: ''});

    await assert.isFulfilled(functions.scheduledMoveGame());

    const rtdbGameSnap = await admin.app().database(`https://pipeline-game-dev-default-rtdb.europe-west1.firebasedatabase.app`).ref(`${RTDBPaths.Games}/gameId1`).get();
    expect(rtdbGameSnap.exists()).eq(true);
  });

  it("should not move game with null lastPlayerDisconnectedAt", async () => {
    await admin.firestore().doc(`${FirebaseCollection.Games}/gameId1`)
      .set({lastPlayerDisconnectedAt: null});
    await admin.app().database(`https://pipeline-game-dev-default-rtdb.europe-west1.firebasedatabase.app`).ref(`${RTDBPaths.Games}/gameId1`)
      .set({something: ''});

    await assert.isFulfilled(functions.scheduledMoveGame());

    const rtdbGameSnap = await admin.app().database(`https://pipeline-game-dev-default-rtdb.europe-west1.firebasedatabase.app`).ref(`${RTDBPaths.Games}/gameId1`).get();

    expect(rtdbGameSnap.exists()).eq(true);
  });

  it("should move game and cards if lastPlayerDisconnectedAt is < now - 24h ", async () => {
    await admin.firestore().doc(`${FirebaseCollection.Games}/gameId1`)
      .set({
        rtdbInstance: 'pipeline-game-dev-default-rtdb.europe-west1',
        lastPlayerDisconnectedAt: new admin.firestore.Timestamp(Math.floor((Date.now() - 24 * 60 * 60 * 1000) / 1000), 100),
      });
    await admin.app().database(`https://pipeline-game-dev-default-rtdb.europe-west1.firebasedatabase.app`).ref(`${RTDBPaths.Games}/gameId1`)
      .set({
        createdAt: {
          _seconds: 14424,
          _nanoseconds: 1424,
        },
      });
    await admin.app().database(`https://pipeline-game-dev-default-rtdb.europe-west1.firebasedatabase.app`).ref(`${RTDBPaths.Cards}/gameId1`)
      .set({something: ''});

    await assert.isFulfilled(functions.scheduledMoveGame());

    const rtdbGameSnap = await admin.app().database(`https://pipeline-game-dev-default-rtdb.europe-west1.firebasedatabase.app`).ref(`${RTDBPaths.Games}/gameId1`).get();
    const cardsSnap = await admin.app().database(`https://pipeline-game-dev-default-rtdb.europe-west1.firebasedatabase.app`).ref(`${RTDBPaths.Cards}/gameId1`).get();

    expect(rtdbGameSnap.exists()).eq(false);
    expect(cardsSnap.exists()).eq(false);
  });

  it("should move game if lastPlayerDisconnectedAt is < now - 24h preserving createdAt", async () => {
    await admin.firestore().doc(`${FirebaseCollection.Games}/gameId1`)
      .set({
        rtdbInstance: 'pipeline-game-dev-default-rtdb.europe-west1',
        lastPlayerDisconnectedAt: new admin.firestore.Timestamp(Math.floor((Date.now() - 24 * 60 * 60 * 1000) / 1000), 100),
      });
    await admin.app().database(`https://pipeline-game-dev-default-rtdb.europe-west1.firebasedatabase.app`).ref(`${RTDBPaths.Games}/gameId1`)
      .set({
        createdAt: {
          _seconds: 14424,
          _nanoseconds: 1424,
        },
      });
    await admin.app().database(`https://pipeline-game-dev-default-rtdb.europe-west1.firebasedatabase.app`).ref(`${RTDBPaths.Cards}/gameId1`)
      .set({something: ''});

    await assert.isFulfilled(functions.scheduledMoveGame());

    const gameData = (await admin.firestore().doc(`${FirebaseCollection.Games}/gameId1`)
      .get()).data() as Game;

    expect((gameData.createdAt as admin.firestore.Timestamp).toMillis()).eq(new admin.firestore.Timestamp(14424, 1424).toMillis());
  });

  it("should move game if lastPlayerDisconnectedAt is < now - 24h updating movedAt", async () => {
    await admin.firestore().doc(`${FirebaseCollection.Games}/gameId1`)
      .set({
        rtdbInstance: 'pipeline-game-dev-default-rtdb.europe-west1',
        movedAt: admin.firestore.FieldValue.serverTimestamp(),
        lastPlayerDisconnectedAt: new admin.firestore.Timestamp(Math.floor((Date.now() - 24 * 60 * 60 * 1000) / 1000), 100),
      });
    const oldMovedAt = ((await admin.firestore().doc(`${FirebaseCollection.Games}/gameId1`)
      .get()).data() as Game).movedAt as admin.firestore.Timestamp;
    await admin.app().database(`https://pipeline-game-dev-default-rtdb.europe-west1.firebasedatabase.app`).ref(`${RTDBPaths.Games}/gameId1`)
      .set({
        createdAt: {
          _seconds: 14424,
          _nanoseconds: 1424,
        },
      });
    await admin.app().database(`https://pipeline-game-dev-default-rtdb.europe-west1.firebasedatabase.app`).ref(`${RTDBPaths.Cards}/gameId1`)
      .set({something: ''});

    await assert.isFulfilled(functions.scheduledMoveGame());

    const gameData = (await admin.firestore().doc(`${FirebaseCollection.Games}/gameId1`)
      .get()).data() as Game;

    expect((gameData.movedAt as admin.firestore.Timestamp).toMillis() > oldMovedAt.toMillis()).eq(true);
  });

  it("should unlock locked cards if lastPlayerDisconnectedAt is < now - 24h", async () => {
    await admin.firestore().doc(`${FirebaseCollection.Games}/gameId1`)
      .set({
        rtdbInstance: 'pipeline-game-dev-default-rtdb.europe-west1',
        lastPlayerDisconnectedAt: new admin.firestore.Timestamp(Math.floor((Date.now() - 24 * 60 * 60 * 1000) / 1000), 100),
      });
    await admin.app().database(`https://pipeline-game-dev-default-rtdb.europe-west1.firebasedatabase.app`).ref(`${RTDBPaths.Games}/gameId1`)
      .set({
        createdAt: {
          _seconds: 14424,
          _nanoseconds: 1424,
        },
      });
    await admin.app().database(`https://pipeline-game-dev-default-rtdb.europe-west1.firebasedatabase.app`).ref(`${RTDBPaths.Cards}/gameId1`)
      .set({
        cardId1: {
          lockedBy: 'someone',
        },
        cardId2: {
          parent: 'board',
        },
        cardId3: {
          lockedBy: 'someone',
          parent: 'board',
        },
      });

    await assert.isFulfilled(functions.scheduledMoveGame());

    const gameData = (await admin.firestore().doc(`${FirebaseCollection.Games}/gameId1`)
      .get()).data() as Game;

    expect(gameData.cards).deep.eq({
      cardId1: {
        lockedBy: null,
      },
      cardId2: {
        lockedBy: null,
        parent: 'board',
      },
      cardId3: {
        lockedBy: null,
        parent: 'board',
      },
    })
  });

  it("should normalize cards zIndex if lastPlayerDisconnectedAt is < now - 24h", async () => {
    await admin.firestore().doc(`${FirebaseCollection.Games}/gameId1`)
      .set({
        rtdbInstance: 'pipeline-game-dev-default-rtdb.europe-west1',
        lastPlayerDisconnectedAt: new admin.firestore.Timestamp(Math.floor((Date.now() - 24 * 60 * 60 * 1000) / 1000), 100),
      });
    await admin.app().database(`https://pipeline-game-dev-default-rtdb.europe-west1.firebasedatabase.app`).ref(`${RTDBPaths.Games}/gameId1`)
      .set({
        createdAt: {
          _seconds: 14424,
          _nanoseconds: 1424,
        },
      });
    await admin.app().database(`https://pipeline-game-dev-default-rtdb.europe-west1.firebasedatabase.app`).ref(`${RTDBPaths.Cards}/gameId1`)
      .set({
        cardId1: {
          lockedBy: 'someone',
          zIndex: 10,
        },
        cardId2: {
          parent: 'board',
          zIndex: 15,
        },
        cardId3: {
          lockedBy: 'someone',
          parent: 'board',
          zIndex: 1,
        },
        cardId4: {
          parent: 'panel',
        },
      });

    await assert.isFulfilled(functions.scheduledMoveGame());

    const gameData = (await admin.firestore().doc(`${FirebaseCollection.Games}/gameId1`)
      .get()).data() as Game;

    expect(gameData.cards).deep.eq({
      cardId1: {
        lockedBy: null,
        zIndex: DEFAULT_Z_INDEX + 1,
      },
      cardId2: {
        lockedBy: null,
        parent: 'board',
        zIndex: DEFAULT_Z_INDEX + 2,
      },
      cardId3: {
        lockedBy: null,
        parent: 'board',
        zIndex: DEFAULT_Z_INDEX,
      },
      cardId4: {
        lockedBy: null,
        parent: 'panel',
      },
    })
  });

});
