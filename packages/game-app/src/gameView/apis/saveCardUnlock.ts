import { CardState, FirebaseCollection } from '@pipeline/common';
import firebase from 'firebase/app';
import 'firebase/database';

export default async function saveCardUnlock(gameId: string, cardId: string) {
  const cardState: Partial<CardState> = {
    lockedBy: null,
  };

  return firebase.app(gameId).database().ref(`${FirebaseCollection.Cards}/${gameId}/${cardId}`).update(cardState);
}
