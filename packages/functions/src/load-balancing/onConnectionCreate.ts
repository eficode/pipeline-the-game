import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import {FirebaseCollection, RTDBPaths} from "@pipeline/common";
import exportFunctionsOnAllRTDBInstances from "../utils/exportFunctionsOnAllRTDBInstances";
import {handleUpdateConnectionsCount} from "./utils";

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

  await handleUpdateConnectionsCount(db, rtdbId, 1);

  await db.collection(FirebaseCollection.Games).doc(gameId).update({lastPlayerDisconnectedAt: null})
  logger.log(`Game ${gameId} lastPlayerDisconnectedAt updated`);
}


exportFunctionsOnAllRTDBInstances(
  'onConnectionCreate',
  (builder, dbId) => builder.ref(`/${RTDBPaths.Connections}/{gameId}/{userId}`)
    .onCreate((snapshot, context) => handler(snapshot, context, dbId)),
  exports
);
