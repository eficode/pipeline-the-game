import { CardState, FirebaseCollection } from '@pipeline/common';
import firebase from 'firebase/app';
import 'firebase/database';

export default async function saveCardEstimation(gameId: string, data: { cardId: string; estimation: string }) {
  const cardState: Partial<CardState> = {
    estimation: data.estimation,
  };

  return firebase.app(gameId).database().ref(`${FirebaseCollection.Cards}/${gameId}/${data.cardId}`).update(cardState);
}
