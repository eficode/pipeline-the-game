import firebase from 'firebase';
import { RTDBPaths } from '@pipeline/common';
import { Status } from '@pipeline/models';

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

export async function stopListenToOnlineStatus(rtdb: firebase.database.Database) {
  rtdb.ref('.info/connected').off('value');
}

export async function callUpdateOnlineStatus(
  rtdb: firebase.database.Database,
  uid: string,
  gameId: string,
  state: 'online' | 'offline',
) {
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
