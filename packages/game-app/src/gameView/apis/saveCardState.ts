import { CardState, FirebaseCollection } from '@pipeline/common';
import firebase from 'firebase/app';
import 'firebase/database';

export default async function saveCardState(
  gameId: string,
  payload: {
    cardId: string;
    position?: { x: number; y: number };
    zIndex?: number | null;
    target: 'panel' | 'board';
  },
) {
  let cardState: Partial<CardState> = {
    parent: payload.target,
    lockedBy: null,
    position: payload.position ?? (null as any),
    zIndex: !payload.zIndex ? null : payload.zIndex,
  };

  if (payload.target === 'panel') {
    cardState.estimation = null;
    cardState.zIndex = null;
  }

  return firebase
    .app(gameId)
    .database()
    .ref(`${FirebaseCollection.Cards}/${gameId}/${payload.cardId}`)
    .update(cardState);
}
