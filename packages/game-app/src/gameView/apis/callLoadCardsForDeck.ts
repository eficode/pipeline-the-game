import { getApp } from 'firebase/app';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore/lite';
import { CardEntity, FirebaseCollection } from '@pipeline/common';

export default async function loadCardsForDeck(deckId: string): Promise<CardEntity[]> {
  const q = query<CardEntity>(
    collection(getFirestore(getApp() as any), FirebaseCollection.Cards),
    where('deckId', '==', deckId),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(d => ({ ...d.data(), id: d.id } as CardEntity));
}
