import firebase from 'firebase';
import { RTDBPaths } from '@pipeline/common';
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
  const connectionsRef = rtdb.ref(`/${RTDBPaths.Connections}/${gameId}/${uid}`);
  const lastOnlineRef = rtdb.ref(`/${RTDBPaths.Statuses}/${uid}/lastOnline`);

  rtdb.ref('.info/connected').on('value', async snapshot => {
    if (snapshot.val() === true) {
      const con = connectionsRef.push();
      await con.onDisconnect().remove(() => {
        onDisconnect();
      });
      await con.set({ updatedAt: firebase.database.ServerValue.TIMESTAMP }, () => {
        onConnect();
      });

      await lastOnlineRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
    }
  });
}

export async function stopListenToOnlineStatus(gameId: string) {
  const rtdb: firebase.database.Database = firebase.app(gameId).database();
  rtdb.ref('.info/connected').off();
  await firebase.app(gameId).delete();
}