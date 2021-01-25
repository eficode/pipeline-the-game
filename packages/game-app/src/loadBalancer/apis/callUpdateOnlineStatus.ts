import firebase from 'firebase';
import { RTDBPaths, Status } from '@pipeline/common';

export async function startListenToOnlineStatus(
  rtdb: firebase.database.Database,
  uid: string,
  gameId: string,
  onConnect: () => void,
  onDisconnect: () => void,
) {
  const userStatusDatabaseRef = rtdb.ref(`/${RTDBPaths.Statuses}/${uid}`);

  const isOfflineForDatabase = {
    state: 'offline' as const,
    updatedAt: firebase.database.ServerValue.TIMESTAMP,
    gameId: null,
  } as Status;

  const isOnlineForDatabase = {
    state: 'online' as const,
    updatedAt: firebase.database.ServerValue.TIMESTAMP,
    gameId,
  } as Status;

  console.log('Connecting to db');
  rtdb.ref('.info/connected').on('value', async snapshot => {
    if (snapshot.val() === false) return;
    await userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase, () => {
      onDisconnect();
    });
    await userStatusDatabaseRef.set(isOnlineForDatabase, () => {
      onConnect();
    });
  });
}

export async function stopListenToOnlineStatus(rtdb: firebase.database.Database) {
  rtdb.ref('.info/connected').off('value');
}

export async function callUpdateOnlineStatus(
  rtdb: firebase.database.Database,
  uid: string,
  gameId: string,
  state: 'online' | 'offline',
) {
  const userStatusDatabaseRef = firebase.database().ref(`/${RTDBPaths.Statuses}/${uid}`);

  const statusForDatabase = {
    state,
    updatedAt: firebase.database.ServerValue.TIMESTAMP,
    gameId,
  } as Status;

  await userStatusDatabaseRef.set(statusForDatabase);
}
