import * as fs from "fs";
import * as firebase from "@firebase/rules-unit-testing";

const rules = fs.readFileSync("firestore.rules", "utf8");
const files = fs.readdirSync("../../fixtures/firestore-data");

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
export async function reinitializeFirestore(projectId: string) {
  await firebase.clearFirestoreData({projectId});
  await loadData(projectId);
  await firebase.loadFirestoreRules({projectId, rules});

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
