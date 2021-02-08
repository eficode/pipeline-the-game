const fs = require('fs');
const fetch = require('node-fetch');
const childProcess = require('child_process');
const firebaseTools = require('firebase-tools');

const databaseRules = fs.readFileSync("./packages/database/database.rules.json");

function run(cmd) {
  return new Promise((resolve, reject) => {
    childProcess.exec(cmd, {env: process.env}, (error, stdout, stderr) => {
      if (error) return reject(error)
      if (stderr) return reject(stderr)
      resolve(stdout)
    })
  })
}

async function loadRulesToRTDBInstances(app) {
  if (process.env.FIREBASE_DATABASE_EMULATOR_HOST) {
    const firestore = app.firestore();
    const rtdbInstancesCollectionQuery = await firestore.collection('rtdbInstances').get();
    for (const rtdbDoc of rtdbInstancesCollectionQuery.docs) {
      const rtdbId = rtdbDoc.id;
      const databaseURL = `http://${process.env.FIREBASE_DATABASE_EMULATOR_HOST}/.settings/rules.json?ns=${process.env.GCLOUD_PROJECT}-${rtdbId}&access_token=`;
      await fetch(databaseURL, {method: 'PUT', body: databaseRules})
    }
  } else {
    const locations = ['europe-west1'];
    let instancesList = [];
    for (const location of locations) {
      const listDatabases = firebaseTools.database.instances.list
      const databases = await listDatabases({location, project: process.env.FIREBASE_PROJECT_ID});
      instancesList = [...instancesList, ...databases];
    }
    await run(`firebase target:clear database main --project $FIREBASE_PROJECT_ID`);
    await run(`firebase target:apply database main ${instancesList.map(d => d.instance).join(' ')} --project $FIREBASE_PROJECT_ID`);
  }
}

exports.loadRules = loadRulesToRTDBInstances;
