import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import {FirebaseCollection, RTDBInstance, RTDBPaths} from "@pipeline/common";
import {PROJECT_ID} from "../utils/rtdb";
import FieldValue = admin.firestore.FieldValue;

const db = admin.firestore();
const logger = functions.logger;

const INSTANCE_ID = `${PROJECT_ID}-default-rtdb`

/**
 * It triggers when the path /connections/{gameId}/{userId} of that RTDB instance is created.
 *
 * The proper document of Firestore, representing that RTDB instance, is updated incrementing by 1
 *
 */

export const onOnlineGameStatusCreate = functions.database.instance(INSTANCE_ID).ref(`/${RTDBPaths.Connections}/{gameId}/{userId}`)
  .onCreate(async (snapshot, context) => {

    const instanceId = INSTANCE_ID;
    const userId = context.params.userId;
    const gameId = context.params.gameId;

    logger.log(`User ${userId} just created connection for game ${gameId}`);
    const docInstanceId = instanceId.split(`${PROJECT_ID}-`)[1];
    await db.collection(FirebaseCollection.RTDBInstances).doc(docInstanceId)
      .update({
        connectionsCount: FieldValue.increment(1) as any
      } as Partial<RTDBInstance>);
  });
