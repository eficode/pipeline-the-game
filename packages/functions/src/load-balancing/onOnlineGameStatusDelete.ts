import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import {FirebaseCollection, RTDBInstance, RTDBPaths} from "@pipeline/common";
import {PROJECT_ID} from "../utils/rtdb";
import FieldValue = admin.firestore.FieldValue;
import {handleLockedCards, handleMoveGame, INSTANCE_NAME} from "./utils";

const db = admin.firestore();
const logger = functions.logger;

const INSTANCE_ID = `${PROJECT_ID}-default-rtdb`

/**
 * It triggers when the path /connections/{gameId}/{userId} of that RTDB instance is deleted.
 *
 * The proper document of Firestore, representing that RTDB instance, is updated incrementing by -1
 *
 * Next, an RTDB query is performed to look for the online users for those games.
 * If more than one were found (because one is the one we were updating), it means there is still someone in the game
 * Otherwise, we can move the game from RTDB back to Firestore, for each game.
 */

export const onOnlineGameStatusDelete = functions.database.instance(INSTANCE_ID).ref(`/${RTDBPaths.Connections}/{gameId}/{userId}`)
  .onDelete(async (snapshot, context) => {

    const instanceId = INSTANCE_ID;
    const userId = context.params.userId;
    const gameId = context.params.gameId;

    logger.log(`User ${userId} just closed all connections for game ${gameId}`);
    const docInstanceId = instanceId.split(`${PROJECT_ID}-`)[1];
    await db.collection(FirebaseCollection.RTDBInstances).doc(docInstanceId)
      .update({
        connectionsCount: FieldValue.increment(-1) as any,
      } as Partial<RTDBInstance>);

    const rtdb = admin.app().database(`https://${INSTANCE_NAME}.firebasedatabase.app`);
    await handleLockedCards(gameId, rtdb, userId);
    logger.log('Locked cards handled');
    await handleMoveGame(gameId, db, rtdb);
    logger.log('Locked cards handled');
  });
