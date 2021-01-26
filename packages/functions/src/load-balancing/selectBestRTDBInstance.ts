import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import {runTransactionWithRetry} from "../utils/db";
import {FirebaseCollection, Game, RTDBPaths} from '@pipeline/common';
import {PROJECT_ID} from "../utils/rtdb";

const db = admin.firestore();
const logger = functions.logger;

/*const getNextRTDBInstanceNum = async (): Promise<number> => {
  const res = await axios.get(`https://firebasedatabase.googleapis.com/v1beta/projects/${PROJECT_ID}/locations/-/instances?pageSize=100`, {
    headers: {
      'Authorization': `Bearer `,
    },
  })
  const instances = res.data.instances as any[];
  return instances.length;
}

const createRTDBInstance = async (databaseId: string) => {
  await axios.get(`https://firebasedatabase.googleapis.com/v1beta/projects/${PROJECT_ID}/locations/${RTDB_LOCATION}/instances?database_id=${databaseId}`, {
    headers: {
      'Authorization': `Bearer `,
    },
  })
}

const createNewRTDBInstance = async () => {
  const nextNum = await getNextRTDBInstanceNum();
  const newRTDBInstanceName = getRTDBInstanceName(nextNum);
  await createRTDBInstance(newRTDBInstanceName);
  await db.collection(FirebaseCollection.RTDBInstances).doc(newRTDBInstanceName).set({
    createdAt: FieldValue.serverTimestamp(),
    onlineOnGameCount: 0,
  } as RTDBInstance)
  admin.app().database(`https://secondary_db_url.firebaseio.com`)

  return newRTDBInstanceName;
}

 */


export const selectBestRTDBInstance = functions.region(
  'europe-west1'
).https.onCall(async (data, context) => {

  logger.log('selectBestRTDBInstance API triggered');

  const gameId = data.gameId as string;
  if (!gameId) {
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
      'one arguments "gameId" the game you want to join');
  }

  if (!context.auth) {
    logger.log('User is not authenticated');
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
      'while authenticated.');
  }


  const bestRTDBInstanceQuery = await db.collection(FirebaseCollection.RTDBInstances)
    .orderBy('onlineOnGameCount', "asc").limit(1).get();
  const bestRTDBInstanceDoc = bestRTDBInstanceQuery.docs[0];
  const bestRTDBInstance = bestRTDBInstanceDoc.data();
  const bestRTDBInstanceName = `${PROJECT_ID}-${bestRTDBInstanceDoc.id}.${bestRTDBInstance.region}`;

  logger.log(`Selected instance ${bestRTDBInstanceName} with ${bestRTDBInstance.onlineOnGameCount} online on game users`);

  /*
  if (bestRTDBInstance.onlineOnGameCount >= RTDB_THRESHOLD) {
    //create new instance
    axi
    admin.database()
  }
  */

  const rtdb = admin.app().database(`https://${bestRTDBInstanceName}.firebasedatabase.app`);

  const gameRef = db.collection(FirebaseCollection.Games).doc(gameId);

  await runTransactionWithRetry(db, async transaction => {
    const gameDoc = await transaction.get(gameRef);
    if(!gameDoc.exists) {
      throw new functions.https.HttpsError('failed-precondition', `The game with ${gameId} does not exists`);
    }
    const game = gameDoc.data() as Game
    if (!game.rtdbInstance) {
      transaction.update(gameRef, {
        rtdbInstance: bestRTDBInstanceName,
      } as Partial<Game>);
      await rtdb.ref(`/${RTDBPaths.Games}/${gameId}`).set({
        ...game,
      })
    }
  });

  return {bestRTDBInstanceName};

});
