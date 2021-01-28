import * as admin from "firebase-admin";
import {FirebaseCollection, CardState, RTDBPaths} from "@pipeline/common";
import {Game} from "../models/Game";
import {RTDBGame} from "../models/RTDBGame";
import * as functions from "firebase-functions";
import {PROJECT_ID} from "../utils/rtdb";

const db = admin.firestore();
const logger = functions.logger;

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

async function handleMoveGame(gameId: string, rtdb: admin.database.Database) {
  const snap = await rtdb.ref(`/${RTDBPaths.Connections}/${gameId}`).orderByChild(`updatedAt`).get();
  console.log('handleMoveGame snap', snap);
  const onlineCount = snap.numChildren();
  logger.log(`Online user for game ${gameId}: ${onlineCount}`);
  if (onlineCount <= 1) {
    await moveGameFromRTDBToFirestore(gameId, db, rtdb);
    logger.log(`Game ${gameId} moved from RTDB to Firestore`);
  }

}

async function handleLockedCards(gameId: string, rtdb: admin.database.Database, userId: string) {
  const snap = await rtdb.ref(`/${RTDBPaths.Cards}/${gameId}`).orderByChild(`lockedBy`).equalTo(userId).get();
  const cardRefs = [] as admin.database.Reference[];
  snap.forEach(s => {
    cardRefs.push(s.ref);
  });
  logger.log(`${cardRefs.length} cards locked by ${userId} in game ${gameId}`);
  for (const cardRef of cardRefs) {
    await cardRef.update({lockedBy: null});
  }
}

const INSTANCE_ID = `${PROJECT_ID}-default-rtdb`
const INSTANCE_NAME = `${INSTANCE_ID}.europe-west1`

export {moveGameFromRTDBToFirestore, handleMoveGame, handleLockedCards, INSTANCE_ID, INSTANCE_NAME};
