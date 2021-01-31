import { collection, doc, getDoc, getFirestore } from 'firebase/firestore/lite';
import { getApp } from 'firebase/app';
import { FirebaseCollection } from '@pipeline/common';
import { Game } from '@pipeline/models';

const db = getFirestore(getApp() as any);

export default async function loadGame(gameId: string): Promise<Game> {
  const docRef = doc(collection(db, FirebaseCollection.Games), gameId);
  const docSnap = await getDoc(docRef);
  return docSnap.data() as Game;
}
