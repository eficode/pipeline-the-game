const admin = require('firebase-admin');
const fs = require('fs');

const files = fs.readdirSync("./fixtures/firestore-data");

const app = admin.initializeApp();

async function loadData() {
    const batch = app.firestore().batch();
    for (const dir of files) {
        const collectionName = dir.replace('.json', '');
        const content = fs.readFileSync(`./fixtures/firestore-data/${dir}`, 'utf8');
        const collectionData = JSON.parse(content);
        for(const docID in collectionData){
            batch.set(admin.firestore().doc(`${collectionName}/${docID}`), collectionData[docID]);
        }
    }

    await batch.commit();
}

loadData().then(()=>console.info("Initial data loaded successfully"));
