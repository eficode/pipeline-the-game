import { CardState, FirebaseCollection } from '@pipeline/common';
import firebase from 'firebase/app';
import 'firebase/database';

export default async function saveCardLok(userId: string, gameId: string, cardId: string, parent: 'board' | 'panel') {
  const cardState: Partial<CardState> = {
    parent,
    lockedBy: userId,
  };

  return firebase.app(gameId).database().ref(`${FirebaseCollection.Cards}/${gameId}/${cardId}`).update(cardState);
}
