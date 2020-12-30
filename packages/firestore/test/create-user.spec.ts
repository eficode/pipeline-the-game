import * as firebase from "@firebase/rules-unit-testing";
import {reinitializeFirestore} from "./utils";

const PROJECT_ID = "firestore-emulator-example-" + Math.floor(Math.random() * 1000);


const COVERAGE_URL = `http://${process.env.FIRESTORE_EMULATOR_HOST}/emulator/v1/projects/${PROJECT_ID}:ruleCoverage.html`;

type Auth = Parameters<typeof firebase.initializeTestApp>[0]['auth'];

/**
 * Creates a new client FirebaseApp with authentication and returns the Firestore instance.
 */
function getAuthedFirestore(auth: Auth) {
  return firebase
    .initializeTestApp({projectId: PROJECT_ID, auth})
    .firestore();
}


beforeEach(async () => {
  await reinitializeFirestore(PROJECT_ID);
});

after(async () => {
  await Promise.all(firebase.apps().map((app) => app.delete()));
  console.log(`View firestore rule coverage information at ${COVERAGE_URL}\n`);
});

describe("User create", () => {

  it("should not allow user creation if not authenticated", async () => {
    const db = getAuthedFirestore(undefined);
    const profile = db.collection("users").doc("alice");
    const rolesDoc = await db.doc('dynamicData/gameRoles').get();
    const maturitiesDoc = await db.doc('dynamicData/devOpsMaturities').get();
    const realRole = rolesDoc.data().roles[0];
    const realMaturity = maturitiesDoc.data().maturities[0];
    await firebase.assertFails(profile.set({
      email: 'test@test.com',
      role: realRole,
      devOpsMaturity: realMaturity
    }));
  });

  it("should allow user creation with correct data", async () => {
    const userUID = 'test';
    const email = 'test@email.com';
    const db = getAuthedFirestore({uid: 'test', email});
    const profile = db.collection("users").doc(userUID);
    const rolesDoc = await db.doc('dynamicData/gameRoles').get();
    const maturitiesDoc = await db.doc('dynamicData/devOpsMaturities').get();
    const realRole = rolesDoc.data().roles[0];
    const realMaturity = maturitiesDoc.data().maturities[0];
    await firebase.assertSucceeds(profile.set({
      email,
      role: realRole,
      devOpsMaturity: realMaturity
    }));
  });

  it("should not allow user creation with invalid role", async () => {
    const userUID = 'test';
    const email = 'test@email.com';
    const db = getAuthedFirestore({uid: 'test', email});
    const profile = db.collection("users").doc(userUID);
    const maturitiesDoc = await db.doc('dynamicData/devOpsMaturities').get();
    const realMaturity = maturitiesDoc.data().maturities[0];
    await firebase.assertFails(profile.set({
      email,
      role: 'invalidRole',
      devOpsMaturity: realMaturity
    }));
  });

  it("should not allow user creation with invalid maturity", async () => {
    const userUID = 'test';
    const email = 'test@email.com';
    const db = getAuthedFirestore({uid: 'test', email});
    const profile = db.collection("users").doc(userUID);
    const rolesDoc = await db.doc('dynamicData/gameRoles').get();
    const realRole = rolesDoc.data().roles[0];
    await firebase.assertFails(profile.set({
      email,
      role: realRole,
      devOpsMaturity: 'invalidMaturity'
    }));
  });

  it("should not allow a user creation if the authenticated request has an email different from the user that is being created", async () => {
    const userUID = 'test';
    const email = 'test@email.com';
    const db = getAuthedFirestore({uid: 'test', email});
    const profile = db.collection("users").doc(userUID);
    await firebase.assertFails(profile.set({
      email: 'test1@email.com',
      role: 'end-user',
      devOpsMaturity: 'very-immature'
    }));
  });

  it("should not allow user creation if the request contains unexpected fields", async () => {
    const userUID = 'test';
    const email = 'test@email.com';
    const db = getAuthedFirestore({uid: 'test', email});
    const profile = db.collection("users").doc(userUID);
    await firebase.assertFails(profile.set({
      email,
      role: 'end-user',
      devOpsMaturity: 'very-immature',
      unexpected: 'unexpected'
    }));
  });

  it("should not allow user creation if the request does not contain all fields", async () => {
    const userUID = 'test';
    const email = 'test@email.com';
    const db = getAuthedFirestore({uid: 'test', email});
    const profile = db.collection("users").doc(userUID);
    await firebase.assertFails(profile.set({
      email,
      role: 'end-user',
    }));
  });

});
