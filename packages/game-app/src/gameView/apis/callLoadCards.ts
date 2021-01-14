import firebase from 'firebase/app';
import 'firebase/firestore';
import { CardEntity, FirebaseCollections } from '@pipeline/common';

const DEFAULT_DECK_ID = '7p5qqvE8kCV9WWysVc2n';

export default async function loadCards(): Promise<CardEntity[]> {
  const cards = await firebase.firestore().collection(FirebaseCollections.Cards).get();

  return cards.docs.map(d => ({ id: d.id, ...d.data() } as CardEntity));
}
