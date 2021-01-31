import { DevOpsMaturitiesDoc, FirebaseCollection, FirebaseDoc, GameRolesDoc } from '@pipeline/common';
import { getApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, serverTimestamp, Timestamp } from 'firebase/firestore/lite';

export async function executeRetrieveGameRoles(): Promise<GameRolesDoc> {
  const gameRolesDoc = await getDoc(
    doc(collection(getFirestore(getApp() as any), FirebaseCollection.DynamicData), FirebaseDoc.GameRoles),
  );
  if (!gameRolesDoc.exists) {
    //TODO handle this
  }
  return gameRolesDoc.data() as GameRolesDoc;
}

export async function executeRetrieveDevOpsMaturities(): Promise<DevOpsMaturitiesDoc> {
  const devOpsMaturitiesDoc = await getDoc(
    doc(collection(getFirestore(getApp() as any), FirebaseCollection.DynamicData), FirebaseDoc.DevOpsMaturities),
  );
  if (!devOpsMaturitiesDoc.exists) {
    //TODO handle this
  }
  return devOpsMaturitiesDoc.data() as DevOpsMaturitiesDoc;
}
