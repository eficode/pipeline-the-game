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


chai.use(chaiAsPromised)

const test = testFactory();

describe("onConnectionsCreate", () => {

  before(()=>{
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

  it("should increase connection count correctly", async () => {
    const wrapped = test.wrap(functions.onConnectionsCreate);
    const gameId = 'testGameId';
    const userId = 'testUserId';

    await admin.firestore().doc(`${FirebaseCollection.RTDBInstances}/${rtdbInstances[0].id}`)
      .set({connectionsCount:0}, {merge:true});
    await admin.firestore().doc(`${FirebaseCollection.Games}/${gameId}`)
      .set({lastPlayerDisconnectedAt: admin.firestore.FieldValue.serverTimestamp()});

    const snap = test.database.makeDataSnapshot(
      {'connectionId1': {updatedAt: 156321}},
      `/${RTDBPaths.Connections}/${gameId}/${userId}`);

    await assert.isFulfilled(wrapped(snap, {params: {gameId, userId}}));

    const dbIstanceData = (await admin.firestore().doc(`${FirebaseCollection.RTDBInstances}/${rtdbInstances[0].id}`)
      .get()).data() as RTDBInstance;

    const gameData = (await admin.firestore().doc(`${FirebaseCollection.Games}/${gameId}`)
      .get()).data() as Game;

    expect(dbIstanceData.connectionsCount).eq(1);
    expect(gameData.lastPlayerDisconnectedAt).eq(null);
  });

});
