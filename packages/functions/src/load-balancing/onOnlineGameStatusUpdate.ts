import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import {FirebaseCollection, RTDBInstance, RTDBPaths, Status} from "@pipeline/common";
import {PROJECT_ID} from "../utils/rtdb";
import FieldValue = admin.firestore.FieldValue;
import {moveGameFromRTDBToFirestore} from "./moveGameFromRTDBToFirestore";

const db = admin.firestore();
const logger = functions.logger;

const INSTANCE_ID = `${PROJECT_ID}-default-rtdb`
const INSTANCE_NAME = `${INSTANCE_ID}.europe-west1`

/**
 * It triggers when the path /statuses/{userId} of that RTDB instance is updated.
 *
 * If the status state is different from the previous one, then:
 *  - if the new one is 'online', the correct document of Firestore, representing the RTDB instance, should be updated incrementing by +1
 *  - if the new one is 'offline', the correct document of Firestore, representing the RTDB instance, should be updated incrementing by -1
 *
 *  Next, if the new status is 'offline', an RTDB query is performed to look for the online users for that game.
 *  If more than one are found (because one is the one we were updating), this means there is still someone in the game
 *  Otherwise, we can move the game from RTDB back to Firestore
 *
 *  TODO check if locked cards should be unlocked
 *
 */

export const onOnlineGameStatusUpdate = functions.database.instance(INSTANCE_ID).ref(`/${RTDBPaths.Statuses}/{userId}`)
  .onUpdate(async (snapshot, context) => {

    const instanceId = INSTANCE_ID;
    const userId = context.params.userId;

    const originalStatus = snapshot.before.val() as Status;
    const nextStatus = snapshot.after.val() as Status;


    if (originalStatus.state !== nextStatus.state) {

        const gameId = nextStatus.gameId as string;

        logger.log(`User ${userId} from game ${gameId} going from ${originalStatus.state} to ${nextStatus.state}`);
        const docInstanceId = instanceId.split(`${PROJECT_ID}-`)[1];
        await db.collection(FirebaseCollection.RTDBInstances).doc(docInstanceId)
          .update({onlineOnGameCount: nextStatus.state === 'online' ?
                FieldValue.increment(1) as any :
                FieldValue.increment(-1) as any,
          } as Partial<RTDBInstance>);
        if (nextStatus.state === 'offline') {
            const rtdb = admin.app().database(`https://${INSTANCE_NAME}.firebasedatabase.app`);
            const snap = await rtdb.ref(`/${RTDBPaths.Statuses}`).orderByChild('gameId').equalTo(gameId).get();
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
  });
