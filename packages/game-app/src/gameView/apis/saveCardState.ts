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
  const cardState: Partial<CardState> = {
    parent: payload.target,
    lockedBy: null,
    position: payload.position ?? (null as any),
    zIndex: payload.target === 'panel' || !payload.zIndex ? (null as any) : payload.zIndex,
  };

  return firebase
    .app(gameId)
    .database()
    .ref(`${FirebaseCollection.Cards}/${gameId}/${payload.cardId}`)
    .update(cardState);
}
