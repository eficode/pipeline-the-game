import * as firebase from "@firebase/rules-unit-testing";
import {getAuthedFirestore, reinitializeFirestore} from "./utils";
import {FirebaseCollection, FirebaseDoc} from '@pipeline/common/build/cjs'
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

describe("User create", () => {

  const userUID = 'test';
  const email = 'test@email.com';

  it("should not allow user creation if not authenticated", async () => {
    const db = getAuthedFirestore(PROJECT_ID, undefined);
    const profile = db.collection(FirebaseCollection.Users).doc("alice");
    const rolesDoc = await db.doc(`${FirebaseCollection.DynamicData}/${FirebaseDoc.GameRoles}`).get();
    const maturitiesDoc = await db.doc(`${FirebaseCollection.DynamicData}/${FirebaseDoc.DevOpsMaturities}`).get();
    const realRole = rolesDoc.data().roles[0];
    const realMaturity = maturitiesDoc.data().maturities[0];
    await firebase.assertFails(profile.set({
      firstName:'John',
      lastName: 'Doe',
      email: 'test@test.com',
      role: realRole,
      devOpsMaturity: realMaturity,
      createdAt: fb.firestore.FieldValue.serverTimestamp()
    }));
  });

  it("should allow user creation with correct data", async () => {

    const db = getAuthedFirestore(PROJECT_ID, {uid: 'test', email});
    const profile = db.collection(FirebaseCollection.Users).doc(userUID);
    const rolesDoc = await db.doc(`${FirebaseCollection.DynamicData}/${FirebaseDoc.GameRoles}`).get();
    const maturitiesDoc = await db.doc(`${FirebaseCollection.DynamicData}/${FirebaseDoc.DevOpsMaturities}`).get();
    const realRole = rolesDoc.data().roles[0];
    const realMaturity = maturitiesDoc.data().maturities[0];
    await firebase.assertSucceeds(profile.set({
      firstName:'John',
      lastName: 'Doe',
      email,
      role: realRole,
      devOpsMaturity: realMaturity,
      createdAt: fb.firestore.FieldValue.serverTimestamp()
    }));
  });

  it("should not allow user creation with invalid role", async () => {
    const db = getAuthedFirestore(PROJECT_ID, {uid: 'test', email});
    const profile = db.collection(FirebaseCollection.Users).doc(userUID);
    const maturitiesDoc = await db.doc(`${FirebaseCollection.DynamicData}/${FirebaseDoc.DevOpsMaturities}`).get();
    const realMaturity = maturitiesDoc.data().maturities[0];
    await firebase.assertFails(profile.set({
      firstName:'John',
      lastName: 'Doe',
      email,
      role: 'invalidRole',
      devOpsMaturity: realMaturity,
      createdAt: fb.firestore.FieldValue.serverTimestamp()
    }));
  });

  it("should not allow user creation with invalid maturity", async () => {
    const db = getAuthedFirestore(PROJECT_ID, {uid: 'test', email});
    const profile = db.collection(FirebaseCollection.Users).doc(userUID);
    const rolesDoc = await db.doc(`${FirebaseCollection.DynamicData}/${FirebaseDoc.GameRoles}`).get();
    const realRole = rolesDoc.data().roles[0];
    await firebase.assertFails(profile.set({
      firstName:'John',
      lastName: 'Doe',
      email,
      role: realRole,
      devOpsMaturity: 'invalidMaturity',
      createdAt: fb.firestore.FieldValue.serverTimestamp()
    }));
  });

  it("should not allow a user creation if the authenticated request has an email different from the user that is being created", async () => {
    const db = getAuthedFirestore(PROJECT_ID, {uid: 'test', email});
    const profile = db.collection(FirebaseCollection.Users).doc(userUID);
    const rolesDoc = await db.doc(`${FirebaseCollection.DynamicData}/${FirebaseDoc.GameRoles}`).get();
    const maturitiesDoc = await db.doc(`${FirebaseCollection.DynamicData}/${FirebaseDoc.DevOpsMaturities}`).get();
    const realRole = rolesDoc.data().roles[0];
    const realMaturity = maturitiesDoc.data().maturities[0];
    await firebase.assertFails(profile.set({
      firstName:'John',
      lastName: 'Doe',
      email: 'test1@email.com',
      role: realRole,
      devOpsMaturity: realMaturity,
      createdAt: fb.firestore.FieldValue.serverTimestamp()
    }));
  });

  it("should not allow user creation if the request contains unexpected fields", async () => {
    const db = getAuthedFirestore(PROJECT_ID, {uid: 'test', email});
    const profile = db.collection(FirebaseCollection.Users).doc(userUID);
    const rolesDoc = await db.doc(`${FirebaseCollection.DynamicData}/${FirebaseDoc.GameRoles}`).get();
    const maturitiesDoc = await db.doc(`${FirebaseCollection.DynamicData}/${FirebaseDoc.DevOpsMaturities}`).get();
    const realRole = rolesDoc.data().roles[0];
    const realMaturity = maturitiesDoc.data().maturities[0];
    await firebase.assertFails(profile.set({
      firstName:'John',
      lastName: 'Doe',
      email,
      role: realRole,
      devOpsMaturity: realMaturity,
      unexpected: 'unexpected',
      createdAt: fb.firestore.FieldValue.serverTimestamp()
    }));
  });

  it("should not allow user creation if the request does not contain all fields", async () => {
    const db = getAuthedFirestore(PROJECT_ID, {uid: 'test', email});
    const profile = db.collection(FirebaseCollection.Users).doc(userUID);
    const rolesDoc = await db.doc(`${FirebaseCollection.DynamicData}/${FirebaseDoc.GameRoles}`).get();
    const realRole = rolesDoc.data().roles[0];
    await firebase.assertFails(profile.set({
      firstName:'John',
      lastName: 'Doe',
      email,
      role: realRole,
      createdAt: fb.firestore.FieldValue.serverTimestamp()
    }));
  });

  it("should not allow user creation if createdAt is not serverTimestamp", async () => {
    const db = getAuthedFirestore(PROJECT_ID, {uid: 'test', email});
    const profile = db.collection(FirebaseCollection.Users).doc(userUID);
    const rolesDoc = await db.doc(`${FirebaseCollection.DynamicData}/${FirebaseDoc.GameRoles}`).get();
    const maturitiesDoc = await db.doc(`${FirebaseCollection.DynamicData}/${FirebaseDoc.DevOpsMaturities}`).get();
    const realRole = rolesDoc.data().roles[0];
    const realMaturity = maturitiesDoc.data().maturities[0];
    await firebase.assertFails(profile.set({
      firstName:'John',
      lastName: 'Doe',
      email,
      role: realRole,
      devOpsMaturity: realMaturity,
      unexpected: 'unexpected',
      createdAt: fb.firestore.Timestamp.now()
    }));
  });

  it("should not allow user creation if names are not provided", async () => {
    const db = getAuthedFirestore(PROJECT_ID, {uid: 'test', email});
    const profile = db.collection(FirebaseCollection.Users).doc(userUID);
    const rolesDoc = await db.doc(`${FirebaseCollection.DynamicData}/${FirebaseDoc.GameRoles}`).get();
    const maturitiesDoc = await db.doc(`${FirebaseCollection.DynamicData}/${FirebaseDoc.DevOpsMaturities}`).get();
    const realRole = rolesDoc.data().roles[0];
    const realMaturity = maturitiesDoc.data().maturities[0];
    await firebase.assertFails(profile.set({
      email,
      role: realRole,
      devOpsMaturity: realMaturity,
      unexpected: 'unexpected',
      createdAt: fb.firestore.FieldValue.serverTimestamp()
    }));
  });

  it("should not allow user creation if names are too long", async () => {
    const db = getAuthedFirestore(PROJECT_ID, {uid: 'test', email});
    const profile = db.collection(FirebaseCollection.Users).doc(userUID);
    const rolesDoc = await db.doc(`${FirebaseCollection.DynamicData}/${FirebaseDoc.GameRoles}`).get();
    const maturitiesDoc = await db.doc(`${FirebaseCollection.DynamicData}/${FirebaseDoc.DevOpsMaturities}`).get();
    const realRole = rolesDoc.data().roles[0];
    const realMaturity = maturitiesDoc.data().maturities[0];
    await firebase.assertFails(profile.set({
      firstName:'x'.repeat(101),
      lastName: 'x'.repeat(101),
      email,
      role: realRole,
      devOpsMaturity: realMaturity,
      unexpected: 'unexpected',
      createdAt: fb.firestore.FieldValue.serverTimestamp()
    }));
  });

});
