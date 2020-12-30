import firebase from 'firebase/app';
import { DevOpsMaturitiesDoc, FirebaseCollections, GameRolesDoc } from '@pipeline/common';
import { SelectOption } from '@pipeline/models';

import 'firebase/firestore';

const retrieveSelectOptions = (source: { [key: string]: { [key: string]: string } }, lang: string): SelectOption[] => {
  return Object.keys(source).map(k => {
    return {
      value: k,
      label: source[k][lang],
    } as SelectOption;
  });
};

export async function executeRetrieveGameRoles(lang = 'en'): Promise<SelectOption[]> {
  const gameRolesDoc = await firebase
    .firestore()
    .doc(`${FirebaseCollections.DynamicData}/${FirebaseCollections.GameRoles}`)
    .get();
  if (!gameRolesDoc.exists) {
    //TODO handle this
  }
  const gameRoles = gameRolesDoc.data() as GameRolesDoc;
  return retrieveSelectOptions(gameRoles.labels, lang);
}

export async function executeRetrieveDevOpsMaturities(lang = 'en'): Promise<SelectOption[]> {
  const devOpsMaturitiesDoc = await firebase
    .firestore()
    .doc(`${FirebaseCollections.DynamicData}/${FirebaseCollections.DevOpsMaturities}`)
    .get();
  if (!devOpsMaturitiesDoc.exists) {
    //TODO handle this
  }
  const devOpsMaturities = devOpsMaturitiesDoc.data() as DevOpsMaturitiesDoc;
  return retrieveSelectOptions(devOpsMaturities.labels, lang);
}
