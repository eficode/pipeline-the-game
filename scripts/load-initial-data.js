/**
 * Setup firebase database loading all the fixture data necessary for the application to work,
 * like cards list, company roles and devops maturities.
 *
 * It takes the data from the fixtures folder assuming the filename is the name of the collection
 * and the data is a map {[firebaseId]: document}.
 *
 * It overrides the object already present into the database.
 *
 * It also initialize rules of the rtdb instances.
 *
 * if the CREATE_TEST_USER is set to true it creates also 2 already verified users with
 * email test@test.com ans test1@test.com, and password Test1234.
 *
 */
const admin = require('firebase-admin');
const fs = require('fs');
const rules = require("./load-rules-to-rtdb-instances");

const files = fs.readdirSync("./fixtures/firestore-data");

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
  await rules.loadRules(app);
}

async function createUser(email){
    const user = await admin.auth().createUser({
        email,
        emailVerified: true,
        password: 'Test1234'
    });
    await admin.firestore().doc(`users/${user.uid}`).set({
        email,
        role: 'budgetOwner',
        devOpsMaturity: 'veryImmature'
    });
}

async function createTestUser() {
  if (process.env.CREATE_TEST_USER === 'true') {

      try {
          await createUser('test@test.com')
          await createUser('test1@test.com')
      } catch (e) {

      }
  }
}


Promise.all([loadData(), createTestUser()]).then(() => console.info("Initial data loaded successfully"));
