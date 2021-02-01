import CONFIG from '@pipeline/app-config';
import firebase from 'firebase';

export function initializeRTDB(rtdbInstance: string, gameId: string) {
  const app = firebase.initializeApp(
    {
      databaseURL: `https://${rtdbInstance}.firebasedatabase.app`,
    },
    gameId,
  );
  CONFIG.REACT_APP_FIREBASE_USE_EMULATORS === 'true' && app.database().useEmulator('localhost', 9000);
}
