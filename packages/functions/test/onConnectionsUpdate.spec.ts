import * as functions from "./function-index-test";
import * as testFactory from 'firebase-functions-test';
import * as chai from 'chai';
import {assert, expect} from 'chai';
import * as chaiAsPromised from 'chai-as-promised'
import * as admin from "firebase-admin";
import {FirebaseCollection, RTDBInstance, RTDBPaths} from "@pipeline/common";
import rtdbInstances from "../src/rtdbInstances";
import * as firebase from "@firebase/rules-unit-testing";


chai.use(chaiAsPromised)

const test = testFactory();

describe("onConnectionsUpdate", () => {

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
    const wrapped = test.wrap(functions.onConnectionsUpdate);

    await admin.firestore().doc(`${FirebaseCollection.RTDBInstances}/${rtdbInstances[0].id}`)
      .set({connectionsCount:0}, {merge:true});

    const beforeSnap = test.database.makeDataSnapshot(
      {'connectionId1': {updatedAt: 156321}},
      `/${RTDBPaths.Connections}/testGameId/testUserId`);

    const afterSnap = test.database.makeDataSnapshot(
      {'connectionId': {updatedAt: 156321}, 'connectionId2': {updatedAt: 156321}},
      `/${RTDBPaths.Connections}/testGameId/testUserId`);
    const change = test.makeChange(beforeSnap, afterSnap);

    await assert.isFulfilled(wrapped(change, {params: {gameId: 'testGameId', userId: 'testUserId'}}), "optional message");

    const dbIstanceData = (await admin.firestore().doc(`${FirebaseCollection.RTDBInstances}/${rtdbInstances[0].id}`)
      .get()).data() as RTDBInstance;

    expect(dbIstanceData.connectionsCount).eq(1)
  });

  it("should decrease connection count correctly", async () => {
    const wrapped = test.wrap(functions.onConnectionsUpdate);

    await admin.firestore().doc(`${FirebaseCollection.RTDBInstances}/${rtdbInstances[0].id}`)
      .set({connectionsCount:1}, {merge:true});

    const beforeSnap  = test.database.makeDataSnapshot(
      {'connectionId': {updatedAt: 156321}, 'connectionId2': {updatedAt: 156321}},
      `/${RTDBPaths.Connections}/testGameId/testUserId`);
    const afterSnap = test.database.makeDataSnapshot(
      {'connectionId1': {updatedAt: 156321}},
      `/${RTDBPaths.Connections}/testGameId/testUserId`);

    const change = test.makeChange(beforeSnap, afterSnap);

    await assert.isFulfilled(wrapped(change, {params: {gameId: 'testGameId', userId: 'testUserId'}}), "optional message");

    const dbIstanceData = (await admin.firestore().doc(`${FirebaseCollection.RTDBInstances}/${rtdbInstances[0].id}`)
      .get()).data() as RTDBInstance;

    expect(dbIstanceData.connectionsCount).eq(0)
  });

  it("should increase connection count correctly for diff > 1", async () => {
    const wrapped = test.wrap(functions.onConnectionsUpdate);

    await admin.firestore().doc(`${FirebaseCollection.RTDBInstances}/${rtdbInstances[0].id}`)
      .set({connectionsCount:0}, {merge:true});

    const beforeSnap = test.database.makeDataSnapshot(
      {'connectionId1': {updatedAt: 156321}},
      `/${RTDBPaths.Connections}/testGameId/testUserId`);

    const afterSnap = test.database.makeDataSnapshot(
      {'connectionId': {updatedAt: 156321}, 'connectionId2': {updatedAt: 156321}, 'connectionId3': {updatedAt: 156321}},
      `/${RTDBPaths.Connections}/testGameId/testUserId`);
    const change = test.makeChange(beforeSnap, afterSnap);

    await assert.isFulfilled(wrapped(change, {params: {gameId: 'testGameId', userId: 'testUserId'}}), "optional message");

    const dbIstanceData = (await admin.firestore().doc(`${FirebaseCollection.RTDBInstances}/${rtdbInstances[0].id}`)
      .get()).data() as RTDBInstance;

    expect(dbIstanceData.connectionsCount).eq(2)
  });

  it("should decrease connection count correctly for diff < -1", async () => {
    const wrapped = test.wrap(functions.onConnectionsUpdate);

    await admin.firestore().doc(`${FirebaseCollection.RTDBInstances}/${rtdbInstances[0].id}`)
      .set({connectionsCount:2}, {merge:true});

    const beforeSnap  = test.database.makeDataSnapshot(
      {'connectionId': {updatedAt: 156321}, 'connectionId2': {updatedAt: 156321}, 'connectionId3': {updatedAt: 156321}},
      `/${RTDBPaths.Connections}/testGameId/testUserId`);
    const afterSnap = test.database.makeDataSnapshot(
      {'connectionId1': {updatedAt: 156321}},
      `/${RTDBPaths.Connections}/testGameId/testUserId`);

    const change = test.makeChange(beforeSnap, afterSnap);

    await assert.isFulfilled(wrapped(change, {params: {gameId: 'testGameId', userId: 'testUserId'}}), "optional message");

    const dbIstanceData = (await admin.firestore().doc(`${FirebaseCollection.RTDBInstances}/${rtdbInstances[0].id}`)
      .get()).data() as RTDBInstance;

    expect(dbIstanceData.connectionsCount).eq(0)
  });

});
