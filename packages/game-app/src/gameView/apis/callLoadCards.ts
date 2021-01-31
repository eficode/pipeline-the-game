import { getApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore/lite';
import { CardEntity, FirebaseCollection } from '@pipeline/common';

export default async function loadCards(): Promise<CardEntity[]> {
  const cards = await getDocs<CardEntity>(collection(getFirestore(getApp() as any), FirebaseCollection.Cards));

  return cards.docs.map(d => ({ ...d.data(), id: d.id }));
}
