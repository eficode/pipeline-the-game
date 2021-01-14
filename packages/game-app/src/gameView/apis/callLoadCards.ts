import firebase from 'firebase/app';
import 'firebase/firestore';
import { CardEntity, FirebaseCollections } from '@pipeline/common';

export default async function loadCards(): Promise<CardEntity[]> {
  const cards = await firebase.firestore().collection(FirebaseCollections.Cards).get();

  return cards.docs.map(d => ({ id: d.id, ...d.data() } as CardEntity));
}
