import firebase from 'firebase/app';
import 'firebase/firestore';
import { CardEntity, FirebaseCollection } from '@pipeline/common';

export default async function loadCardsForDeck(deckId: string): Promise<CardEntity[]> {
  const cards = await firebase.firestore().collection(FirebaseCollection.Cards).where('deckId', '==', deckId).get();

  return cards.docs.map(d => ({ id: d.id, ...d.data() } as CardEntity));
}
