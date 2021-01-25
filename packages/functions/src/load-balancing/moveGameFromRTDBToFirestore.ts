import * as admin from "firebase-admin";
import {FirebaseCollection, Game, RTDBPaths} from "@pipeline/common";

/**
 * It moves a game from a particular RTDB instance to Firestore.
 * Before writing to Firestore, the 'rtdbInstance' field is set to null
 *
 * @param gameId
 * @param db
 * @param rtdb
 */
const moveGameFromRTDBToFirestore = async (gameId: string, db: FirebaseFirestore.Firestore, rtdb: admin.database.Database) => {
  const gameSnap = await rtdb.ref(`/${RTDBPaths.Games}/${gameId}`).get();
  const game = gameSnap.val() as Game;
  game.rtdbInstance = null;
  await db.collection(FirebaseCollection.Games).doc(gameId).update({...game});
}

export {moveGameFromRTDBToFirestore};
