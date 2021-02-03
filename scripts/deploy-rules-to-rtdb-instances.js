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

async function loadRulesToRTDBInstances() {
  if (process.env.FIREBASE_DATABASE_EMULATOR_HOST) {
    const listDatabases = firebaseTools.database.instances.list
    const databases = await listDatabases();
    for (const database of databases) {
      const databaseURL = `http://${process.env.FIREBASE_DATABASE_EMULATOR_HOST}/.settings/rules.json?ns=${database}&access_token=`;
      await fetch(databaseURL, {method: 'PUT', body: databaseRules})
    }
    await run(`firebase target:clear database main --project $FIREBASE_PROJECT_ID`);
    await run(`firebase target:apply database main ${databases.map(d => d.instance).join(' ')} --project $FIREBASE_PROJECT_ID`);
  } else {
    const listDatabases = firebaseTools.database.instances.list
    const databases = await listDatabases();
    await run(`firebase target:clear database main --project $FIREBASE_PROJECT_ID`);
    await run(`firebase target:apply database main ${databases.map(d => d.instance).join(' ')} --project $FIREBASE_PROJECT_ID`);
  }
}

loadRulesToRTDBInstances().then(() => console.info("Rules loaded correctly"));
