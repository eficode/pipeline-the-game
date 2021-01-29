import { CardState, FirebaseCollection } from '@pipeline/common';
import firebase from 'firebase/app';
import 'firebase/database';

export default async function saveCardState(
  gameId: string,
  payload: {
    cardId: string;
    position?: { x: number; y: number };
    target: 'panel' | 'board';
  },
) {
  const cardState: Partial<CardState> = {
    parent: payload.target,
    lockedBy: null,
  };
  if (payload.position) {
    cardState.position = payload.position;
  }

  return firebase
    .app(gameId)
    .database()
    .ref(`${FirebaseCollection.Cards}/${gameId}/${payload.cardId}`)
    .update(cardState);
}
