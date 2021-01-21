import firebase from 'firebase/app';
import 'firebase/firestore';
import { FirebaseCollection, Game } from '@pipeline/common';

export default async function loadGame(gameId: string): Promise<Game> {
  const gameDoc = await firebase.firestore().collection(FirebaseCollection.Games).doc(gameId).get();
  return gameDoc.data() as Game;
}
