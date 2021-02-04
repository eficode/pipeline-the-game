import firebase from 'firebase/app';
import 'firebase/database';
import { CardState, FirebaseCollection } from '@pipeline/common';

export default async function loadCardsState(gameId: string): Promise<{ [cardId: string]: CardState }> {
  const cardsState = await firebase.app(gameId).database().ref(`${FirebaseCollection.Cards}/${gameId}`).get();
  return cardsState.exists() ? cardsState.val() : {};
}
