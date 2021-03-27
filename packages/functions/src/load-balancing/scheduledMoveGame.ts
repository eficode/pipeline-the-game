import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import {FirebaseCollection} from '@pipeline/common';
import {getDatabase} from "../utils/rtdb";
import {Game} from "../models/Game";
import {moveGameFromRTDBToFirestore} from "./utils";
const logger = functions.logger;

export const DAY_IN_MILLIS = 24 * 60 * 60 * 1000;

/**
 * Scheduled job to move stale games from the real time database to Firestore.
 *
 * A game is stale if no one connects to it for a day.
 */
export const moveGamesJob = async () => {
  const lastActiveGamesDate = new Date(Date.now() - DAY_IN_MILLIS);

  const db = admin.firestore();
  const oldActiveGamesQuery = db.collection(FirebaseCollection.Games)
      .where(`lastPlayerDisconnectedAt`, '<=', lastActiveGamesDate);

  //pagination should not be necessary
  const oldActiveGamesSnap = await oldActiveGamesQuery.get();
  logger.log(`Found ${oldActiveGamesSnap.docs.length} old active games`);

  for (const gameDoc of oldActiveGamesSnap.docs) {
    const game = gameDoc.data() as Game;
      await moveGameFromRTDBToFirestore(gameDoc.id, db, getDatabase(`https://${game.rtdbInstance!}.firebasedatabase.app`))
  }

  logger.log('moveGames job ended');
}

export const scheduledMoveGamesJob = functions.region(
  'europe-west1'
).runWith({
  memory: '2GB',
  timeoutSeconds: 540,
}).pubsub.schedule(`every 60 minutes`).onRun(async () => {
  await moveGamesJob();
});
