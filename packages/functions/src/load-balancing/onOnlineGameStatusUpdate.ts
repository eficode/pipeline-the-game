import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import {FirebaseCollection, RTDBInstance, RTDBPaths} from "@pipeline/common";
import {PROJECT_ID} from "../utils/rtdb";
import FieldValue = admin.firestore.FieldValue;
import {INSTANCE_ID} from "./utils";

const db = admin.firestore();
const logger = functions.logger;


/**
 * It triggers when the path /connections/{gameId}/{userId} of that RTDB instance is updated.
 *
 * If the number of connections is different from the previous one, then:
 *  - if the new ones are more, the proper document of Firestore, representing the RTDB instance, is updated incrementing by +1
 *  - if the new ones are less, the proper document of Firestore, representing the RTDB instance, is updated incrementing by -1
 *
 *  Next, if the new status is 'offline', an RTDB query is performed to look for the online users for those games.
 *  If more than one were found (because one is the one we were updating), it means there is still someone in the game
 *  Otherwise, we can move the game from RTDB back to Firestore, for each game.
 *
 *
 */

export const onOnlineGameStatusUpdate = functions.database.instance(INSTANCE_ID).ref(`/${RTDBPaths.Connections}/{gameId}/{userId}`)
  .onUpdate(async (snapshot, context) => {

    const instanceId = INSTANCE_ID;
    const userId = context.params.userId;
    const gameId = context.params.gameId;

    const previousConnections = snapshot.before.numChildren();
    const afterConnections = snapshot.after.numChildren();



    if (previousConnections > afterConnections) {
      logger.log(`User ${userId} for game ${gameId} has closed one connection`);
      const docInstanceId = instanceId.split(`${PROJECT_ID}-`)[1];
      await db.collection(FirebaseCollection.RTDBInstances).doc(docInstanceId)
        .update({
          connectionsCount: FieldValue.increment(-1) as any,
        } as Partial<RTDBInstance>);
    }
    if (afterConnections > previousConnections) {
      logger.log(`User ${userId} for game ${gameId} has opened one connection`);
      const docInstanceId = instanceId.split(`${PROJECT_ID}-`)[1];
      await db.collection(FirebaseCollection.RTDBInstances).doc(docInstanceId)
        .update({
          connectionsCount: FieldValue.increment(1) as any,
        } as Partial<RTDBInstance>);
    }
  });
