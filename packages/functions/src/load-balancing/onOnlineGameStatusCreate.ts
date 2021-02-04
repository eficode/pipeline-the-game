import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import {FirebaseCollection, RTDBInstance, RTDBPaths} from "@pipeline/common";
import exportFunctionsOnAllRTDBInstances from "../utils/exportFunctionsOnAllRTDBInstances";
import FieldValue = admin.firestore.FieldValue;
import * as retry from "async-retry";

const db = admin.firestore();
const logger = functions.logger;

/**
 * It triggers when the path /connections/{gameId}/{userId} of that RTDB instance is created.
 *
 * The proper document of Firestore, representing that RTDB instance, is updated incrementing by 1
 *
 */
export async function handler(snapshot: functions.database.DataSnapshot, context: functions.EventContext, rtdbId: string) {
  const userId = context.params.userId;
  const gameId = context.params.gameId;
  // TODO snapshot.instance in emulator is always the default one
  // const docInstanceId = parseRTDBInstanceId(snapshot.instance);

  logger.log(`User ${userId} just created connection for game ${gameId} in ${rtdbId} snapshotInstance ${snapshot.instance}`);

  try {
    await retry(async () => {
      await db.collection(FirebaseCollection.RTDBInstances).doc(rtdbId)
        .update({
          connectionsCount: FieldValue.increment(1) as any,
        } as Partial<RTDBInstance>);
    }, {
      retries: 3,
    });
  } catch (e) {
    console.error('Error updating connections count');
  }

  await db.collection(FirebaseCollection.Games).doc(gameId).update({lastPlayerDisconnectedAt: null})
  logger.log(`Game ${gameId} lastPlayerDisconnectedAt updated`);
}


exportFunctionsOnAllRTDBInstances(
  'onOnlineGameStatusCreate',
  (builder, dbId) => builder.ref(`/${RTDBPaths.Connections}/{gameId}/{userId}`)
    .onCreate((snapshot, context) => handler(snapshot, context, dbId)),
  exports
);
