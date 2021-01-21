import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import axios from 'axios';
import FieldValue = admin.firestore.FieldValue;
import {checkAuth} from "../utils/auth";
import {runTransactionWithRetry} from "../utils/db";
import {FirebaseCollection, RTDBInstance, Game, RTDBPaths} from '@pipeline/common';
import {getRTDBInstanceName, PROJECT_ID} from "../utils/rtdb";
import {end, RTDB_LOCATION} from "../utils/general";
const db = admin.firestore();
const logger = functions.logger;

const getNextRTDBInstanceNum = async (): Promise<number> => {
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


export const selectBestRTDBInstance = functions.region(
  'europe-west1'
).https.onRequest(async (req, res) => {

  logger.log('selectBestRTDBInstance API triggered');

  try {

    if (req.method !== "GET") {
      res.status(405).send("Method not allowed");
      return end();
    }

    const gameId = req.query.gameId as string;
    if (!gameId) {
      res.status(400).send("Missing required parameter");
      return end();
    }

    const decodedToken = await checkAuth(req, res);

    if (!decodedToken) {
      logger.log('User is not authenticated');
      res.status(403).send();
      return end();
    }


    logger.log('User uid', decodedToken.uid);

    const bestRTDBInstanceQuery = await db.collection(FirebaseCollection.RTDBInstances)
      .orderBy('onlineOnGameCount', "asc").limit(1).get();
    const bestRTDBInstanceDoc = bestRTDBInstanceQuery.docs[0];
    const bestRTDBInstance = bestRTDBInstanceDoc.data();
    const bestRTDBInstanceId = bestRTDBInstanceDoc.id;

    logger.log(`Selected instance ${bestRTDBInstanceId} with ${bestRTDBInstance.onlineOnGameCount} online on game users`);

    /*
    if (bestRTDBInstance.onlineOnGameCount >= RTDB_THRESHOLD) {
      //create new instance
      axi
      admin.database()
    }
    */

    const rtdb = admin.app().database(`https://${bestRTDBInstanceId}.${RTDB_LOCATION}.firebasedatabase.app`);

    const gameRef = db.collection(FirebaseCollection.Games).doc(gameId);

    await runTransactionWithRetry(db, async transaction => {
      const gameDoc = await transaction.get(gameRef);
      const game = gameDoc.data() as Game;
      if (!game.rtdbInstance) {
        transaction.update(gameRef, {
          rtdbInstance: bestRTDBInstanceId,
        } as Partial<Game>);
        await rtdb.ref(`/${RTDBPaths.Games}/${gameId}`).set({
          ...game,
        })
      }
    });

    res.status(200).send({bestRTDBInstanceId});

  } catch (e) {
    logger.error(e);
    res.status(500).send("Unknown error");
  }

  return end();

});
