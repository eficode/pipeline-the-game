import * as fs from "fs";
import * as firebase from "@firebase/rules-unit-testing";

const files = fs.readdirSync("../../fixtures/firestore-data");

export const PROJECT_ID = "functions-emulator-example-" + Math.floor(Math.random() * 1000);


export async function allSequentially(promises: Promise<any>[]) {
  for (const promise of promises) {
    await promise;
  }
}

/**
 * Data to preload in to firestore
 */
const collectionObjects = files.map((file) => {
  const name = file.replace('.json', '');
  const content = fs.readFileSync(`../../fixtures/firestore-data/${file}`, 'utf8');
  const data = JSON.parse(content);

  return {
    name,
    data
  };
});


/**
 * Create a test instance of firebase adding initial data
 * @param projectId
 */
export async function reinitializeFirestore() {
  try {
    await firebase.clearFirestoreData({projectId: PROJECT_ID});
    await loadData(PROJECT_ID);
  } catch (e) {
    console.error(e);
  }

}


/**
 * Uses admin SDK (bypass rules) to load initial data in fixtures
 * into the test firestore instance
 *
 * @param projectId
 */
async function loadData(projectId: string) {
  const app = firebase.initializeAdminApp({projectId});

  const batch = app.firestore().batch();
  for (const collection of collectionObjects) {

    for (const docID in collection.data) {
      batch.set(app.firestore().doc(`${collection.name}/${docID}`), collection.data[docID]);
    }
  }

  await batch.commit();
}

/**
 * Creates a new admin FirebaseApp and returns the Firestore instance.
 */
export function getAdminFirestore() {
  return firebase.initializeAdminApp({ projectId: PROJECT_ID }).firestore();
}

/**
 * Creates a new admin FirebaseApp and returns a Database instance.
 */
export function getAdminDatabase() {
  return firebase.initializeAdminApp({ projectId: PROJECT_ID }).database('https://pipeline-game-development-default-rtdb.europe-west1.firebasedatabase.app');
}

