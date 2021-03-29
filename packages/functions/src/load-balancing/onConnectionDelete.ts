import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import {RTDBPaths} from "@pipeline/common";
import {handleLockedCards, handleUpdateConnectionsCount, handleUpdateLastPlayerDisconnectedAtGameField} from "./utils";
import exportFunctionsOnAllRTDBInstances from "../utils/exportFunctionsOnAllRTDBInstances";
import {getDatabase} from "../utils/rtdb";

const logger = functions.logger;

/**
 * It triggers when the path /connections/{gameId}/{userId} of that RTDB instance is deleted.
 *
 * The proper document of Firestore, representing that RTDB instance, is updated incrementing by -1
 *
 * Cards that are locked by the disconnected user are unlocked
 */

export async function handler(snapshot: functions.database.DataSnapshot, context: functions.EventContext, rtdbId:string, rtdbUrl:string) {

  const userId = context.params.userId;
  const gameId = context.params.gameId;
  // TODO snapshot.instance in emulator is always the default one
  // const docInstanceId = parseRTDBInstanceId(snapshot.instance);

  logger.log(`User ${userId} just closed all connections for game ${gameId} in instance ${rtdbId}`);

  const db = admin.firestore();

  await handleUpdateConnectionsCount(db, rtdbId, -1);

  const rtdb = getDatabase(
    rtdbUrl
  );

  await handleLockedCards(gameId, rtdb, userId);
  logger.log('Locked cards handled');
  await handleUpdateLastPlayerDisconnectedAtGameField(gameId, db, rtdb);
  logger.log('LastPlayerDisconnectedAt handled');
}


exportFunctionsOnAllRTDBInstances(
  'onConnectionDelete',
  (builder, rtdbId, rtdbUrl) => builder.ref(`/${RTDBPaths.Connections}/{gameId}/{userId}`)
    .onDelete((snapshot, context) => handler(snapshot, context, rtdbId, rtdbUrl)),
  exports
);
