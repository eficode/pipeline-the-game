import firebase from 'firebase/app';
import 'firebase/firestore';
import { FirebaseCollection } from '@pipeline/common';
import { RTDBGame } from '@pipeline/models';

export default async function loadGame(gameId: string): Promise<RTDBGame> {
  const gameDoc = await firebase.app(gameId).database().ref(`${FirebaseCollection.Games}/${gameId}`).get();
  return gameDoc.val() as RTDBGame;
}
