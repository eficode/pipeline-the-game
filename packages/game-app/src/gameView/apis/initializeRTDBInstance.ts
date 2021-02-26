import CONFIG from '@pipeline/app-config';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export async function initializeRTDB(rtdbInstance: string, gameId: string) {
  const app = firebase.initializeApp(
    {
      apiKey: CONFIG.REACT_APP_FIREBASE_CONFIG_API_KEY,
      authDomain: CONFIG.REACT_APP_FIREBASE_CONFIG_AUTH_DOMAIN,
      projectId: CONFIG.REACT_APP_FIREBASE_CONFIG_PROJECT_ID,
      storageBucket: CONFIG.REACT_APP_FIREBASE_CONFIG_STORAGE_BUCKET,
      messagingSenderId: CONFIG.REACT_APP_FIREBASE_CONFIG_MESSAGING_SENDER_ID,
      appId: CONFIG.REACT_APP_FIREBASE_CONFIG_APP_ID,
      databaseURL: `https://${rtdbInstance}.firebasedatabase.app`,
    },
    gameId,
  );
  if (CONFIG.REACT_APP_FIREBASE_USE_EMULATORS === 'true') {
    app.database().useEmulator('localhost', 9000);
    app.auth().useEmulator('http://localhost:9099/');
  }
  await app.auth().updateCurrentUser(firebase.auth().currentUser);
}
