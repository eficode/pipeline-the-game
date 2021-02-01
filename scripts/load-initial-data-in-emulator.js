const admin = require('firebase-admin');
const fs = require('fs');
const fetch = require('node-fetch');

const files = fs.readdirSync("./fixtures/firestore-data");
const databaseRules = fs.readFileSync("./packages/database/database.rules.json");

const app = admin.initializeApp();

async function loadData() {
  const batch = app.firestore().batch();
  for (const dir of files) {
    const collectionName = dir.replace('.json', '');
    const content = fs.readFileSync(`./fixtures/firestore-data/${dir}`, 'utf8');
    const collectionData = JSON.parse(content);
    for (const docID in collectionData) {
      batch.set(admin.firestore().doc(`${collectionName}/${docID}`), collectionData[docID]);
    }
  }

  await batch.commit();
  await loadRulesToRTDBInstances();
}

async function createTestUser() {
  if (process.env.CREATE_TEST_USER === 'true') {

      try {
          const user = await admin.auth().createUser({
              email: 'test@test.com',
              emailVerified: true,
              password: 'Test123'
          });
          await admin.firestore().doc(`users/${user.uid}`).set({
              email: 'test@test.com',
              role: 'budgetOwner',
              devOpsMaturity: 'veryImmature'
          });
      } catch (e) {

      }
  }
}

async function loadRulesToRTDBInstances() {
  const firestore = app.firestore();
  const rtdbInstancesCollectionQuery = await firestore.collection('rtdbInstances').get();
  for (const rtdbDoc of rtdbInstancesCollectionQuery.docs) {
    const rtdbId = rtdbDoc.id;
    const rtdbData = rtdbDoc.data();
    if (process.env.FIREBASE_DATABASE_EMULATOR_HOST) {
      const databaseURL = `http://${process.env.FIREBASE_DATABASE_EMULATOR_HOST}/.settings/rules.json?ns=${process.env.GCLOUD_PROJECT}-${rtdbId}&access_token=`;
      await fetch(databaseURL, {method: 'PUT', body: databaseRules})
    } else {
      const databaseURL = `http://${process.env.GCLOUD_PROJECT}-${rtdbId}.${rtdbData.region}`;
      const rtdbInstance = admin.app().database(databaseURL);
      await rtdbInstance.setRules(databaseRules);
    }
  }
}

Promise.all([loadData(), createTestUser()]).then(() => console.info("Initial data loaded successfully"));
