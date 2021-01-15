import firebase from 'firebase/app';
import 'firebase/firestore';
import { CardEntity, FirebaseCollection } from '@pipeline/common';

export default async function loadCards(): Promise<CardEntity[]> {
  const cards = await firebase.firestore().collection(FirebaseCollection.Cards).get();

  return cards.docs.map(d => ({ id: d.id, ...d.data() } as CardEntity));
}
