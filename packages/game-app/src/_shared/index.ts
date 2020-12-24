import {buildStore} from "./store";
import firebase from "firebase";
import CONFIG from "@pipeline/app-config";
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

export function bootstrap() {

  firebase.initializeApp({
    apiKey: CONFIG.REACT_APP_FIREBASE_CONFIG_API_KEY,
    authDomain: CONFIG.REACT_APP_FIREBASE_CONFIG_AUTH_DOMAIN,
    databaseURL: CONFIG.REACT_APP_FIREBASE_CONFIG_DATABASE_URL,
    projectId: CONFIG.REACT_APP_FIREBASE_CONFIG_PROJECT_ID,
    storageBucket: CONFIG.REACT_APP_FIREBASE_CONFIG_STORAGE_BUCKET,
    messagingSenderId: CONFIG.REACT_APP_FIREBASE_CONFIG_MESSAGING_SENDER_ID,
    appId: CONFIG.REACT_APP_FIREBASE_CONFIG_APP_ID,
  });

  firebase.analytics();

  const store = buildStore();

  store.dispatch({type: 'test'});
  // For sage test
  store.dispatch({type: 'ping'});

  return store;

}
