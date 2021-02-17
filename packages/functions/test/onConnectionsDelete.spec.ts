import * as functions from "./function-index-test";
import * as testFactory from 'firebase-functions-test';
import * as chai from 'chai';
import {assert, expect} from 'chai';
import * as chaiAsPromised from 'chai-as-promised'
import * as admin from "firebase-admin";
import {FirebaseCollection, RTDBInstance, RTDBPaths} from "@pipeline/common";
import rtdbInstances from "../src/rtdbInstances";
import {Game} from "../src/models/Game";
import * as firebase from "@firebase/rules-unit-testing";
import {allSequentially} from "./utils";


chai.use(chaiAsPromised)

const test = testFactory();

describe("onConnectionsDelete", () => {

  before(() => {
    admin.initializeApp();
  })

  beforeEach(() => {
    return allSequentially([
      firebase.clearFirestoreData({projectId: process.env.GCLOUD_PROJECT!}),
      admin.app().database(`https://pipeline-game-dev-default-rtdb.europe-west1.firebasedatabase.app`).ref().set(null)]);
  })

  after(() => {
    // Do cleanup tasks.
    test.cleanup();
    return Promise.all(admin.apps.map(a => a?.delete()));
  });

  it("should decrease connection count correctly", async () => {
    const wrapped = test.wrap(functions.onConnectionsDelete);
    const gameId = 'testGameId';
    const userId = 'testUserId';

    await admin.firestore().doc(`${FirebaseCollection.RTDBInstances}/${rtdbInstances[0].id}`)
      .set({connectionsCount: 1}, {merge: true});
    await admin.firestore().doc(`${FirebaseCollection.Games}/${gameId}`)
      .set({lastPlayerDisconnectedAt: null});

    const snap = test.database.makeDataSnapshot(
      {'connectionId1': {updatedAt: 156321}},
      `/${RTDBPaths.Connections}/${gameId}/${userId}`);

    await assert.isFulfilled(wrapped(snap, {params: {gameId, userId}}));

    const dbIstanceData = (await admin.firestore().doc(`${FirebaseCollection.RTDBInstances}/${rtdbInstances[0].id}`)
      .get()).data() as RTDBInstance;

    expect(dbIstanceData.connectionsCount).eq(0);
  });

  it("should unlock cards related to the userId correctly", async () => {
    const wrapped = test.wrap(functions.onConnectionsDelete);
    const gameId = 'testGameId';
    const userId = 'testUserId';

    await admin.firestore().doc(`${FirebaseCollection.RTDBInstances}/${rtdbInstances[0].id}`)
      .set({connectionsCount: 1}, {merge: true});
    await admin.firestore().doc(`${FirebaseCollection.Games}/${gameId}`)
      .set({
        lastPlayerDisconnectedAt: null,
      });
    await admin.app().database(`https://pipeline-game-dev-default-rtdb.europe-west1.firebasedatabase.app`)
      .ref(`${RTDBPaths.Cards}/${gameId}`).set({
        randomId1: {
          lockedBy: userId,
        },
        randomId2: {
          lockedBy: 'randomUserId2',
        },
        randomId3: {
          lockedBy: null,
        },
        randomId4: {
          something: '',
        },
      });

    const snap = test.database.makeDataSnapshot(
      {'connectionId1': {updatedAt: 156321}},
      `/${RTDBPaths.Connections}/${gameId}/${userId}`);

    await assert.isFulfilled(wrapped(snap, {params: {gameId, userId}}));

    const cardsSnap = await admin.app().database(`https://pipeline-game-dev-default-rtdb.europe-west1.firebasedatabase.app`)
      .ref(`${RTDBPaths.Cards}/${gameId}`).get();

    expect(cardsSnap.exists()).to.eq(true);
    const cards = cardsSnap.val();
    expect(cards).to.deep.eq({
      randomId2: {
        lockedBy: 'randomUserId2',
      },
      randomId4: {
        something: '',
      },
    })
  });

  it("should unlock no cards if not related to the userId", async () => {
    const wrapped = test.wrap(functions.onConnectionsDelete);
    const gameId = 'testGameId';
    const userId = 'testUserId';

    await admin.firestore().doc(`${FirebaseCollection.RTDBInstances}/${rtdbInstances[0].id}`)
      .set({connectionsCount: 1}, {merge: true});
    await admin.firestore().doc(`${FirebaseCollection.Games}/${gameId}`)
      .set({
        lastPlayerDisconnectedAt: null,
      });
    await admin.app().database(`https://pipeline-game-dev-default-rtdb.europe-west1.firebasedatabase.app`)
      .ref(`${RTDBPaths.Cards}/${gameId}`).set({
        randomId1: {
          lockedBy: 'randomUserId1',
        },
        randomId2: {
          lockedBy: 'randomUserId2',
        },
        randomId3: {
          lockedBy: null,
        },
        randomId4: {
          something: '',
        },
      });

    const snap = test.database.makeDataSnapshot(
      {'connectionId1': {updatedAt: 156321}},
      `/${RTDBPaths.Connections}/${gameId}/${userId}`);

    await assert.isFulfilled(wrapped(snap, {params: {gameId, userId}}));

    const cardsSnap = await admin.app().database(`https://pipeline-game-dev-default-rtdb.europe-west1.firebasedatabase.app`)
      .ref(`${RTDBPaths.Cards}/${gameId}`).get();

    expect(cardsSnap.exists()).to.eq(true);
    const cards = cardsSnap.val();
    expect(cards).to.deep.eq({
      randomId1: {
        lockedBy: 'randomUserId1',
      },
      randomId2: {
        lockedBy: 'randomUserId2',
      },
      randomId4: {
        something: '',
      },
    })
  });

  it("should not touch lastPlayerDisconnectedAt if there are still players online", async () => {
    const wrapped = test.wrap(functions.onConnectionsDelete);
    const gameId = 'testGameId';
    const userId = 'testUserId';

    await admin.firestore().doc(`${FirebaseCollection.RTDBInstances}/${rtdbInstances[0].id}`)
      .set({connectionsCount: 1}, {merge: true});
    await admin.firestore().doc(`${FirebaseCollection.Games}/${gameId}`)
      .set({
        lastPlayerDisconnectedAt: null,
      });
    await admin.app().database(`https://pipeline-game-dev-default-rtdb.europe-west1.firebasedatabase.app`)
      .ref(`${RTDBPaths.Connections}/${gameId}/${userId}`).push({updatedAt: 124342});
    await admin.app().database(`https://pipeline-game-dev-default-rtdb.europe-west1.firebasedatabase.app`)
      .ref(`${RTDBPaths.Connections}/${gameId}/randomUserId`).push({updatedAt: 124342});

    const snap = test.database.makeDataSnapshot(
      {'connectionId1': {updatedAt: 156321}},
      `/${RTDBPaths.Connections}/${gameId}/${userId}`);

    await assert.isFulfilled(wrapped(snap, {params: {gameId, userId}}));

    const gameData = (await admin.firestore().doc(`${FirebaseCollection.Games}/${gameId}`)
      .get()).data() as Game;

    expect(gameData.lastPlayerDisconnectedAt).eq(null);
  });


  it("should update lastPlayerDisconnectedAt with a timestamp if there are no players online", async () => {
    const wrapped = test.wrap(functions.onConnectionsDelete);
    const gameId = 'testGameId';
    const userId = 'testUserId';

    await admin.firestore().doc(`${FirebaseCollection.RTDBInstances}/${rtdbInstances[0].id}`)
      .set({connectionsCount: 1}, {merge: true});
    await admin.firestore().doc(`${FirebaseCollection.Games}/${gameId}`)
      .set({
        lastPlayerDisconnectedAt: null,
      });

    const snap = test.database.makeDataSnapshot(
      {'connectionId1': {updatedAt: 156321}},
      `/${RTDBPaths.Connections}/${gameId}/${userId}`);

    await assert.isFulfilled(wrapped(snap, {params: {gameId, userId}}));

    const gameData = (await admin.firestore().doc(`${FirebaseCollection.Games}/${gameId}`)
      .get()).data() as Game;

    expect(gameData.lastPlayerDisconnectedAt).not.eq(null);
  });

});
