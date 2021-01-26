import * as admin from "firebase-admin";
import {FirebaseCollection, CardState, RTDBPaths} from "@pipeline/common";
import {Game} from "../models/Game";
import {RTDBGame} from "../models/RTDBGame";

/**
 * It moves a game from a particular RTDB instance to Firestore.
 * Before writing to Firestore, the 'rtdbInstance' field is set to null and all the cards are unlocked
 *
 * @param gameId
 * @param db
 * @param rtdb
 */
const moveGameFromRTDBToFirestore = async (gameId: string, db: FirebaseFirestore.Firestore, rtdb: admin.database.Database) => {
  const gameSnap = await rtdb.ref(`/${RTDBPaths.Games}/${gameId}`).get();
  const game = gameSnap.val() as RTDBGame;
  const cardsSnap = await rtdb.ref(`/${RTDBPaths.Cards}/${gameId}`).get();
  let newCards = null;
  if (cardsSnap.exists()) {
    const cards = cardsSnap.val() as {[key: string]: CardState};
    newCards = Object.keys(cards).reduce((acc, cardId) => {
      acc[cardId] = {...cards[cardId], lockedBy: null};
      return acc;
    }, {} as {[key: string]: CardState});
  }
  await db.collection(FirebaseCollection.Games).doc(gameId).update({...game, rtdbInstance: null, cards: newCards} as Game);
}

export {moveGameFromRTDBToFirestore};
