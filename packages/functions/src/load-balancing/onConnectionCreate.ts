import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import {FirebaseCollection, RTDBPaths} from "@pipeline/common";
import exportFunctionsOnAllRTDBInstances from "../utils/exportFunctionsOnAllRTDBInstances";
import {handleUpdateConnectionsCount} from "./utils";
import {runTransactionWithRetry} from "../utils/db";

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

  const db = admin.firestore();

  await handleUpdateConnectionsCount(db, rtdbId, 1);

  const gameRef = db.collection(FirebaseCollection.Games).doc(gameId);
  await runTransactionWithRetry(db, async transaction => {
    const gameDoc = await transaction.get(gameRef);
    if (gameDoc.exists) {
      transaction.update(gameRef, {lastPlayerDisconnectedAt: null});
    } else {
      logger.log(`Game ${gameId} does not exist anymore`);
    }
  });
  logger.log(`Game ${gameId} lastPlayerDisconnectedAt updated`);
}


exportFunctionsOnAllRTDBInstances(
  'onConnectionCreate',
  (builder, dbId) => builder.ref(`/${RTDBPaths.Connections}/{gameId}/{userId}`)
    .onCreate((snapshot, context) => handler(snapshot, context, dbId)),
  exports
);
