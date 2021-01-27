import firebase from 'firebase';
import { RTDBPaths } from '@pipeline/common';
import { Status } from '@pipeline/models';
import CONFIG from '@pipeline/app-config';

export function initializeRTDB(rtdbInstance: string, gameId: string) {
  const app = firebase.initializeApp(
    {
      databaseURL: `https://${rtdbInstance}.firebasedatabase.app`,
    },
    gameId,
  );
  CONFIG.REACT_APP_FIREBASE_USE_EMULATORS === 'true' && app.database().useEmulator('localhost', 9000);
}

export async function startListenToOnlineStatus(
  uid: string,
  gameId: string,
  onConnect: () => void,
  onDisconnect: () => void,
) {
  const rtdb: firebase.database.Database = firebase.app(gameId).database();
  const userStatusDatabaseRef = rtdb.ref(`/${RTDBPaths.Statuses}/${uid}`);

  const isOfflineForDatabase = {
    state: 'offline' as const,
    updatedAt: firebase.database.ServerValue.TIMESTAMP,
    gameIds: null,
  } as Status;

  const isOnlineForDatabase = {
    state: 'online' as const,
    updatedAt: firebase.database.ServerValue.TIMESTAMP,
  } as Partial<Status>;

  console.log('Connecting to db');
  rtdb.ref('.info/connected').on('value', async snapshot => {
    if (snapshot.val() === false) return;
    await userStatusDatabaseRef.onDisconnect().update(isOfflineForDatabase, () => {
      onDisconnect();
    });
    await userStatusDatabaseRef.update({ ...isOnlineForDatabase, [`gameIds/${gameId}`]: true }, () => {
      onConnect();
    });
  });
}

export async function stopListenToOnlineStatus(gameId: string) {
  const rtdb: firebase.database.Database = firebase.app(gameId).database();
  rtdb.ref('.info/connected').off('value');
}

export async function callUpdateOnlineStatus(uid: string, gameId: string, state: 'online' | 'offline') {
  const userStatusDatabaseRef = firebase.app(gameId).database().ref(`/${RTDBPaths.Statuses}/${uid}`);

  const statusForDatabase = {
    state,
    updatedAt: firebase.database.ServerValue.TIMESTAMP,
  } as Partial<Status>;

  await userStatusDatabaseRef.update(
    state === 'offline'
      ? { ...statusForDatabase, gameIds: null }
      : { ...statusForDatabase, [`gameIds/${gameId}`]: true },
  );
}
