import { GameCreationData } from '../types/gameCreationData';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { FirebaseCollection, Game } from '@pipeline/common';

const DEFAULT_DECK_ID = '7p5qqvE8kCV9WWysVc2n';

export default function callCreateGame(data: GameCreationData, userId: string): Promise<string> {
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
    } as Game)
    .then(res => res.id);
}
