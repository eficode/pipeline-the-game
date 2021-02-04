import * as admin from "firebase-admin";
import {FirebaseCollection, CardState, RTDBPaths, RTDBInstance} from "@pipeline/common";
import {Game} from "../models/Game";
import {RTDBGame} from "../models/RTDBGame";
import * as functions from "firebase-functions";
import * as retry from "async-retry";

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
  const gamePath = `/${RTDBPaths.Games}/${gameId}`;
  const gameRef = rtdb.ref(gamePath);
  const gameSnap = await gameRef.get();
  const game = gameSnap.val() as RTDBGame;
  const cardsPath = `/${RTDBPaths.Cards}/${gameId}`;
  const cardsRef = rtdb.ref(cardsPath);
  const cardsSnap = await cardsRef.get();
  let newCards = null;
  if (cardsSnap.exists()) {
    const cards = cardsSnap.val() as {[key: string]: CardState};
    newCards = Object.keys(cards).reduce((acc, cardId) => {
      acc[cardId] = {...cards[cardId], lockedBy: null};
      return acc;
    }, {} as {[key: string]: CardState});
  }
  await db.collection(FirebaseCollection.Games).doc(gameId).update({...game, rtdbInstance: null,
    cards: newCards, lastPlayerDisconnectedAt: null, movedAt: admin.firestore.FieldValue.serverTimestamp()} as Game);
  await rtdb.ref().update({
    [gamePath]: null,
    [cardsPath]: null,
  });
}

async function handleUpdateLastPlayerDisconnectedAtGameField(gameId: string, db: FirebaseFirestore.Firestore, rtdb: admin.database.Database) {
  const snap = await rtdb.ref(`/${RTDBPaths.Connections}/${gameId}`).get();
  const onlineCount = snap.exists() ? snap.numChildren() : 0;
  logger.log(`Online user for game ${gameId}: ${onlineCount}`);
  if (onlineCount === 0) {
    await db.collection(FirebaseCollection.Games).doc(gameId).update({lastPlayerDisconnectedAt: admin.firestore.FieldValue.serverTimestamp()})
    logger.log(`Game ${gameId} lastPlayerDisconnectedAt updated`);
  }

}

async function handleLockedCards(gameId: string, rtdb: admin.database.Database, userId: string) {
  const ref = rtdb.ref(RTDBPaths.Cards);
  const ref1 = ref.child(gameId);
  const snap = await ref1.get();
  const cardRefs = [] as admin.database.Reference[];
  snap.forEach(s => {
    const card: CardState = s.val();
    if (card && card.lockedBy === userId) {
      cardRefs.push(s.ref);
    }
  });
  logger.log(`${cardRefs.length} cards locked by ${userId} in game ${gameId}`);
  for (const card of cardRefs) {
    await card.update({lockedBy: null});
  }
}

async function handleUpdateConnectionsCount(db: FirebaseFirestore.Firestore, rtdbId: string, increment: number) {
  try {
    await retry(async () => {
      await db.collection(FirebaseCollection.RTDBInstances).doc(rtdbId)
        .update({
          connectionsCount: admin.firestore.FieldValue.increment(increment) as any,
        } as Partial<RTDBInstance>);
    }, {
      retries: 3,
    });
  } catch (e) {
    logger.error('Error updating connections count');
  }
}

export {moveGameFromRTDBToFirestore, handleUpdateLastPlayerDisconnectedAtGameField, handleLockedCards, handleUpdateConnectionsCount};
