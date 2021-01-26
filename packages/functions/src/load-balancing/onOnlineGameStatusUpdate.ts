import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import {FirebaseCollection, RTDBInstance, RTDBPaths} from "@pipeline/common";
import {PROJECT_ID} from "../utils/rtdb";
import {moveGameFromRTDBToFirestore} from "./moveGameFromRTDBToFirestore";
import FieldValue = admin.firestore.FieldValue;
import {Status} from "../models/Status";

const db = admin.firestore();
const logger = functions.logger;

const INSTANCE_ID = `${PROJECT_ID}-default-rtdb`
const INSTANCE_NAME = `${INSTANCE_ID}.europe-west1`

async function handleMoveGame(nextStatus: Status, rtdb: admin.database.Database) {
  for (const gameId of Object.keys(nextStatus.gameIds!)) {
    if (nextStatus.gameIds![gameId]) {
      const snap = await rtdb.ref(`/${RTDBPaths.Statuses}`).orderByChild(`gameIds/${gameId}`).equalTo(true).get();
      const statuses: Status[] = [];
      snap.forEach(s => {
        statuses.push(s.val());
      });
      const onlineCount = statuses.filter((s: Status) => s.state === 'online').length;
      logger.log(`Online user for game ${gameId}: ${onlineCount}`);
      if (onlineCount <= 1) {
        await moveGameFromRTDBToFirestore(gameId, db, rtdb);
        logger.log(`Game ${gameId} moved from RTDB to Firestore`);
      }
    }
  }
}

async function handleLockedCards(nextStatus: Status, rtdb: admin.database.Database, userId: string) {
  for (const gameId of Object.keys(nextStatus.gameIds!)) {
    if (nextStatus.gameIds![gameId]) {
      const snap = await rtdb.ref(`/${RTDBPaths.Cards}/${gameId}`).orderByChild(`lockedBy`).equalTo(userId).get();
      const cardRefs = [] as admin.database.Reference[];
      snap.forEach(s => {
        cardRefs.push(s.ref);
      });
      logger.log(`${cardRefs.length} cards locked by ${userId}`);
      for (const cardRef of cardRefs) {
        await cardRef.update({lockedBy: null});
      }
    }
  }
}

/**
 * It triggers when the path /statuses/{userId} of that RTDB instance is updated.
 *
 * If the status state is different from the previous one, then:
 *  - if the new one is 'online', the correct document of Firestore, representing the RTDB instance, should be updated incrementing by +1
 *  - if the new one is 'offline', the correct document of Firestore, representing the RTDB instance, should be updated incrementing by -1
 *
 *  Next, if the new status is 'offline', an RTDB query is performed to look for the online users for those games.
 *  If more than one were found (because one is the one we were updating), it means there is still someone in the game
 *  Otherwise, we can move the game from RTDB back to Firestore, for each game.
 *
 *
 */

export const onOnlineGameStatusUpdate = functions.database.instance(INSTANCE_ID).ref(`/${RTDBPaths.Statuses}/{userId}`)
  .onUpdate(async (snapshot, context) => {

    const instanceId = INSTANCE_ID;
    const userId = context.params.userId;

    const originalStatus = snapshot.before.val() as Status;
    const nextStatus = snapshot.after.val() as Status;


    if (originalStatus.state !== nextStatus.state) {
      logger.log(`User ${userId} is going from ${originalStatus.state} to ${nextStatus.state}`);
      const docInstanceId = instanceId.split(`${PROJECT_ID}-`)[1];
      await db.collection(FirebaseCollection.RTDBInstances).doc(docInstanceId)
        .update({
          onlineOnGameCount: nextStatus.state === 'online' ?
            FieldValue.increment(1) as any :
            FieldValue.increment(-1) as any,
        } as Partial<RTDBInstance>);
      if (nextStatus.state === 'offline') {
        const rtdb = admin.app().database(`https://${INSTANCE_NAME}.firebasedatabase.app`);
        if (nextStatus.gameIds) {
          await handleLockedCards(nextStatus, rtdb, userId);
          logger.log('Locked cards handled');
          await handleMoveGame(nextStatus, rtdb);
          logger.log('Locked cards handled');
        }  else {
          logger.log('No games');
        }
      }
    }
  });
