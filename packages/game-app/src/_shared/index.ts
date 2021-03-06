import { buildStore } from './store';
import CONFIG from '@pipeline/app-config';
import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/database';
import { initializeI18n } from './i18n';
import { actions as authActions, selectors as authSelectors } from './auth';
import { useSelector } from 'react-redux';
import config from '@pipeline/app-config';
import { actions as networkStatusActions, selectors as networkStatusSelectors } from '@pipeline/networkStatus';

/**
 * Initialization function to call at the startup.
 * Returns the configured store to Provide at the root of your app
 */
export function bootstrap() {
  initializeI18n();

  firebase.initializeApp({
    apiKey: CONFIG.REACT_APP_FIREBASE_CONFIG_API_KEY,
    authDomain: CONFIG.REACT_APP_FIREBASE_CONFIG_AUTH_DOMAIN,
    databaseURL: CONFIG.REACT_APP_FIREBASE_CONFIG_DATABASE_URL,
    projectId: CONFIG.REACT_APP_FIREBASE_CONFIG_PROJECT_ID,
    storageBucket: CONFIG.REACT_APP_FIREBASE_CONFIG_STORAGE_BUCKET,
    messagingSenderId: CONFIG.REACT_APP_FIREBASE_CONFIG_MESSAGING_SENDER_ID,
    appId: CONFIG.REACT_APP_FIREBASE_CONFIG_APP_ID,
  });
  // TODO find a way to not import all firestore module at startup
  if (config.REACT_APP_FIREBASE_USE_EMULATORS === 'true') {
    firebase.firestore().settings({ experimentalForceLongPolling: true });
    firebase.auth().useEmulator('http://localhost:9099/');
    firebase.functions().useEmulator('localhost', 5001);
    const functions = firebase.app().functions('europe-west1');
    functions.useEmulator('localhost', 5001);
    firebase.firestore().useEmulator('localhost', 8080);
    firebase.database().useEmulator('localhost', 9000);
  }

  firebase.analytics();

  const store = buildStore();

  store.dispatch(authActions.initialize());
  store.dispatch(networkStatusActions.listenToNetwork());

  return store;
}

/**
 * A hook that can be used to ensure that the asynchronous tasks of the initialization
 * process are concluded.
 */
export function useBootstrapIsFinished() {
  const isAuthInitialized = useSelector(authSelectors.isInitialized);
  const isNetworkInitialized = useSelector(networkStatusSelectors.getIsInitialized);
  return isAuthInitialized && isNetworkInitialized;
}
