import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import {RTDBPaths} from "@pipeline/common";
import {handleLockedCards, handleUpdateConnectionsCount, handleUpdateLastPlayerDisconnectedAtGameField} from "./utils";
import exportFunctionsOnAllRTDBInstances from "../utils/exportFunctionsOnAllRTDBInstances";
import {getDatabase} from "../utils/rtdb";
const db = admin.firestore();
const logger = functions.logger;

/**
 * It triggers when the path /connections/{gameId}/{userId} of that RTDB instance is deleted.
 *
 * The proper document of Firestore, representing that RTDB instance, is updated incrementing by -1
 *
 * Next, an RTDB query is performed to look for the online users for those games.
 * If more than zero were found, it means there is still someone in the game
 * Otherwise, we can move the game from RTDB back to Firestore, for each game.
 */

async function handler(snapshot: functions.database.DataSnapshot, context: functions.EventContext, rtdbId:string, rtdbUrl:string) {

  const userId = context.params.userId;
  const gameId = context.params.gameId;
  // TODO snapshot.instance in emulator is always the default one
  // const docInstanceId = parseRTDBInstanceId(snapshot.instance);

  logger.log(`User ${userId} just closed all connections for game ${gameId} in instance ${rtdbId}`);

  await handleUpdateConnectionsCount(db, rtdbId, -1);

  const rtdb = getDatabase(
    rtdbUrl
  );

  await handleLockedCards(gameId, rtdb, userId);
  logger.log('Locked cards handled');
  await handleUpdateLastPlayerDisconnectedAtGameField(gameId, db, rtdb);
  logger.log('Locked cards handled');
}


exportFunctionsOnAllRTDBInstances(
  'onConnectionDelete',
  (builder, rtdbId, rtdbUrl) => builder.ref(`/${RTDBPaths.Connections}/{gameId}/{userId}`)
    .onDelete((snapshot, context) => handler(snapshot, context, rtdbId, rtdbUrl)),
  exports
);