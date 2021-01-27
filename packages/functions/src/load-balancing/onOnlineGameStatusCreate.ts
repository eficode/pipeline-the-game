import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import {FirebaseCollection, RTDBInstance, RTDBPaths} from "@pipeline/common";
import {PROJECT_ID} from "../utils/rtdb";
import FieldValue = admin.firestore.FieldValue;
import {Status} from "../models/Status";

const db = admin.firestore();
const logger = functions.logger;

const INSTANCE_ID = `${PROJECT_ID}-default-rtdb`

/**
 * It triggers when the path /statuses/{userId} of that RTDB instance is created.
 *
 * If the new one is 'online', the correct document of Firestore, representing the RTDB instance, should be updated incrementing by +1
 * If the new one is 'offline', the correct document of Firestore, representing the RTDB instance, should be updated incrementing by -1
 *
 *
 */

export const onOnlineGameStatusCreate = functions.database.instance(INSTANCE_ID).ref(`/${RTDBPaths.Statuses}/{userId}`)
  .onCreate(async (snapshot, context) => {

    const instanceId = INSTANCE_ID;
    const userId = context.params.userId;

    const status = snapshot.val() as Status;

    logger.log(`User ${userId} just created status as ${status.state}`);
    const docInstanceId = instanceId.split(`${PROJECT_ID}-`)[1];
    await db.collection(FirebaseCollection.RTDBInstances).doc(docInstanceId)
      .update({
        onlineOnGameCount: status.state === 'online' ?
          FieldValue.increment(1) as any :
          FieldValue.increment(-1) as any,
      } as Partial<RTDBInstance>);
  });
