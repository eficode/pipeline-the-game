import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import {FirebaseCollection, RTDBInstance, RTDBPaths} from "@pipeline/common";
import exportFunctionsOnAllRTDBInstances from "../utils/exportFunctionsOnAllRTDBInstances";
import FieldValue = admin.firestore.FieldValue;
import * as retry from "async-retry";

const db = admin.firestore();
const logger = functions.logger;


async function handleUpdateConnectionsCount(rtdbId: string, connectionsDiff: number) {
  try {
    await retry(async () => {
      await db.collection(FirebaseCollection.RTDBInstances).doc(rtdbId)
        .update({
          connectionsCount: FieldValue.increment(connectionsDiff) as any,
        } as Partial<RTDBInstance>);
    }, {
      retries: 3,
    });
  } catch (e) {
    console.error('Error updating connections count');
  }
}

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

export async function handler(snapshot: functions.Change<functions.database.DataSnapshot>, context: functions.EventContext, rtdbId: string) {
  logger.log('test', context.resource, context.params);

  const userId = context.params.userId;
  const gameId = context.params.gameId;
  // TODO snapshot.instance in emulator is always the default one
  //const docInstanceId = parseRTDBInstanceId(snapshot.after.instance);

  const previousConnections = snapshot.before.numChildren();
  const afterConnections = snapshot.after.numChildren();

  const connectionsDiff = afterConnections - previousConnections;

  if (connectionsDiff < 0) {
    logger.log(`User ${userId} for game ${gameId} has closed one connection instance ${rtdbId}`);
    await handleUpdateConnectionsCount(rtdbId, connectionsDiff);
  }
  if (connectionsDiff > 0) {
    logger.log(`User ${userId} for game ${gameId} has opened one connection`);
    await handleUpdateConnectionsCount(rtdbId, connectionsDiff);
  }
}


exportFunctionsOnAllRTDBInstances(
  'onOnlineGameStatusUpdate',
  (builder, rtdbId) => builder.ref(`/${RTDBPaths.Connections}/{gameId}/{userId}`)
    .onUpdate((change, context) => handler(change, context, rtdbId)),
  exports
);
