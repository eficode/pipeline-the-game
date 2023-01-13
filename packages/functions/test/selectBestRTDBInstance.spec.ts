import * as functions from "./function-index-test";
import * as testFactory from 'firebase-functions-test';
import * as chai from 'chai';
import {expect} from 'chai';
import * as chaiAsPromised from 'chai-as-promised'
import * as firebaseFunctions from 'firebase-functions';
import * as admin from "firebase-admin";
import {FirebaseCollection, RTDBPaths} from "@pipeline/common";
import rtdbInstances from "../src/rtdbInstances";
import {allSequentially, getAdminDatabase, reinitializeFirestore} from "./utils";

chai.use(chaiAsPromised)

const test = testFactory();

describe("SelectBestRTDBInstance", () => {

  before(()=>{
    admin.initializeApp();
  });

  beforeEach(() => {
    return allSequentially([
      reinitializeFirestore(),
      getAdminDatabase().ref().set(null)]);
  });

  after(() => {
    // Do cleanup tasks.
    test.cleanup();
    return Promise.all(admin.apps.map(a => a!.delete()));
  });

  it("should throw if no gameId is provided", async () => {
    const wrapped = test.wrap(functions.selectBestRTDBInstance);
    return expect(wrapped({})).to.eventually.rejectedWith(
      firebaseFunctions.https.HttpsError,
      'The function must be called with one arguments "gameId" the game you want to join'
    );
  });

  it("should throw if no auth is provided", async () => {
    const wrapped = test.wrap(functions.selectBestRTDBInstance);
    return expect(wrapped({gameId: 'gameId'})).to.eventually.rejectedWith(
      firebaseFunctions.https.HttpsError,
      'The function must be called while authenticated.'
    );
  });


  it("should throw if a non existing game is provided", async () => {
    await admin.firestore().doc(`${FirebaseCollection.RTDBInstances}/${rtdbInstances[0].id}`)
      .set({connectionsCount:0, region: 'europe-west1'}, {merge:true});
    const wrapped = test.wrap(functions.selectBestRTDBInstance);
    const auth = test.auth.exampleUserRecord();
    return expect(wrapped({gameId: 'gameId'}, {auth})).to.eventually.rejectedWith(
      firebaseFunctions.https.HttpsError,
      `The game with gameId does not exists`
    );
  });

  it("should return instance correctly", async () => {

    const gameData = {
      scenarioTitle: 'test',
    };
    await admin.firestore().doc(`${FirebaseCollection.RTDBInstances}/${rtdbInstances[0].id}`)
      .set({connectionsCount:0, region: 'europe-west1'}, {merge:true});
    const gameDoc = await admin.firestore().collection(FirebaseCollection.Games).add(gameData);
    const wrapped = test.wrap(functions.selectBestRTDBInstance);
    const auth = test.auth.exampleUserRecord();
    await expect(wrapped({gameId: gameDoc.id}, {auth})).to.eventually.deep.eq({
      bestRTDBInstanceName: 'pipeline-game-local-default-rtdb.europe-west1',
    });
    const snap = await admin.app().database(`https://pipeline-game-local-default-rtdb.europe-west1.firebasedatabase.app`)
      .ref(`${RTDBPaths.Games}/${gameDoc.id}`).get();
    expect(snap.exists()).to.eq(true);
    return expect(snap.val()).to.deep.eq(gameData);
  });

});
