import firebase from 'firebase/app';
import { DevOpsMaturitiesDoc, FirebaseCollection, FirebaseDoc, GameRolesDoc } from '@pipeline/common';

import 'firebase/firestore';

export async function executeRetrieveGameRoles(): Promise<GameRolesDoc> {
  const gameRolesDoc = await firebase
    .firestore()
    .doc(`${FirebaseCollection.DynamicData}/${FirebaseDoc.GameRoles}`)
    .get();
  if (!gameRolesDoc.exists) {
    //TODO handle this
  }
  return gameRolesDoc.data() as GameRolesDoc;
}

export async function executeRetrieveDevOpsMaturities(): Promise<DevOpsMaturitiesDoc> {
  const devOpsMaturitiesDoc = await firebase
    .firestore()
    .doc(`${FirebaseCollection.DynamicData}/${FirebaseDoc.DevOpsMaturities}`)
    .get();
  if (!devOpsMaturitiesDoc.exists) {
    //TODO handle this
  }
  return devOpsMaturitiesDoc.data() as DevOpsMaturitiesDoc;
}
