import * as firebase from "@firebase/rules-unit-testing";
import * as fs from "fs";

const PROJECT_ID = "firestore-emulator-example";


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
  // Clear the database between tests
  await firebase.clearFirestoreData({projectId: PROJECT_ID});
});

before(async () => {
  // Load rules and initialize project
  const rules = fs.readFileSync("firestore.rules", "utf8");
  await firebase.loadFirestoreRules({projectId: PROJECT_ID, rules});
});

after(async () => {
  await Promise.all(firebase.apps().map((app) => app.delete()));
  console.log(`View firestore rule coverage information at ${COVERAGE_URL}\n`);
});

describe("User create", () => {

  it("should not let create a user if not authenticated", async () => {
    const db = getAuthedFirestore(undefined);
    const profile = db.collection("users").doc("alice");
    await firebase.assertFails(profile.set({birthday: "January 1"}));
  });

  it("should let create a user correctly", async () => {
    const userUID = 'test';
    const email = 'test@email.com';
    const db = getAuthedFirestore({uid: 'test', email});
    const profile = db.collection("users").doc(userUID);
    await firebase.assertSucceeds(profile.set({
      email,
      role: 'end-user',
      devOpsMaturity: 'very-immature'
    }));
  });

  it("should not let create a user if uses an email different from the auth", async () => {
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

  it("should not let create a user if contains unexpected fields", async () => {
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

  it("should not let create user if not contains all fields", async () => {
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
