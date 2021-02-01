import { GameCreationData } from '../types/gameCreationData';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { FirebaseCollection } from '@pipeline/common';
import { Game } from '@pipeline/models';

export const DEFAULT_DECK_ID = '7p5qqvE8kCV9WWysVc2n';

export default async function callCreateGame(data: GameCreationData, userId: string): Promise<string> {
  data.createdAt = firebase.firestore.Timestamp.now();
  return firebase
    .firestore()
    .collection(FirebaseCollection.Games)
    .add({
      scenarioContent: data.scenarioContent,
      scenarioTitle: data.scenarioTitle,
      scenarioCardId: data.scenarioCardId || null,
      facilitator: {
        id: userId,
      },
      deckId: DEFAULT_DECK_ID,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      boardDimensions: {
        x: 3840,
        y: 2160,
      },
      review: false,
      cards: null,
      rtdbInstance: null,
    } as Game)
    .then(res => res.id);
}
