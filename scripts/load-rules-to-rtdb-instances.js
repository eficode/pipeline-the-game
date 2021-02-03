const admin = require('firebase-admin');
const fs = require('fs');
const fetch = require('node-fetch');

const databaseRules = fs.readFileSync("./packages/database/database.rules.json");

const app = admin.initializeApp();

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

exports.loadRules = loadRulesToRTDBInstances;
