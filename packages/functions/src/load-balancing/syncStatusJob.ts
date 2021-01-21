import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import {FirebaseCollection, RTDBInstance, RTDBPaths, Status} from "@pipeline/common";
import {PROJECT_ID} from "../utils/rtdb";
import Timestamp = admin.firestore.Timestamp;
import {end, RTDB_LOCATION} from "../utils/general";
import {moveGameFromRTDBToFirestore} from "./moveGameFromRTDBToFirestore";
import * as _ from 'lodash';

const db = admin.firestore();
const logger = functions.logger;

/**
 * It's a job scheduled every 30 mins. It's needed to synchronize disconnected users.
 * First of all, all RTDB instances are retrieved from the proper Firestore document.
 * Then, for each of these RTDB instances, a query is performed, looking for online status.
 * At this point, for each users found as online, we check if the last time they updated their status
 * is too old. Old is defined as 25s before now.
 * These are grouped by their gameId.
 *
 * At this point, for each game id, it's checked if the game itself have to be moved. In order to do this,
 * an RTDB query and then a filter are performed to obtain the online users for that game.
 *
 * Now, if these online users are less or equal than the disconnected ones, game is moved.
 *
 * After it, every disconnected user is updated to reflect the real offline status.
 *
 * NB: This job will trigger the onUpdate RTDB triggers, and because of this one could think that
 * the game move of this job is useless. But, because of the async nature of the RTDB trigger,
 * we prefer to keep the game move logic also here
 *
 */

const syncStatusJob = async () => {
  logger.log('syncStatusJob triggered');
  const rtdbInstancesQuery = await db.collection(FirebaseCollection.RTDBInstances).get();
  for (const rtdbDoc of rtdbInstancesQuery.docs) {
    const rtdb = admin.app().database(`https://${rtdbDoc.id}.${RTDB_LOCATION}.firebasedatabase.app`);
    const snap = await rtdb.ref(`/${RTDBPaths.Statuses}`).orderByChild('state').equalTo('online').get();
    const disconnectedStatusesIds: string[] = [];
    const nowMillis = Date.now();
    snap.forEach(s => {
      const status = s.val() as Status;
      // if an user is online but he is not updating it's status since 25s -> disconnected
      if (nowMillis - 25000 >= (status.updatedAt as Timestamp).toMillis()) {
        disconnectedStatusesIds.push(s.key as string);
      }
    });
    const disconnectedStatusesIdsByGameId = _.groupBy(disconnectedStatusesIds, 'gameId');
    for (const gameIdKey of Object.keys(disconnectedStatusesIdsByGameId)) {

      const disconnectedsByGameId = disconnectedStatusesIdsByGameId[gameIdKey];
      const statusSnap = await rtdb.ref(`/${RTDBPaths.Statuses}`).orderByChild('gameId').equalTo(gameIdKey).get();
      const statuses: Status[] = [];
      statusSnap.forEach(s => {
        statuses.push(s.val())
      });
      const onlineCount = statuses.filter((s: Status) => s.state === 'online').length;
      if (onlineCount <= disconnectedsByGameId.length) {
        // game must be moved
        await moveGameFromRTDBToFirestore(gameIdKey, db, rtdb);
      }
      for (const disconnectedIdByGameId of disconnectedsByGameId) {
        // status must be updated
        await rtdb.ref(`/${RTDBPaths.Statuses}/${disconnectedIdByGameId}`).update({
          state: 'offline',
          updatedAt: admin.database.ServerValue.TIMESTAMP,
          gameId: null,
        })
      }
    }
  }
};
