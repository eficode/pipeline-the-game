import { buildStore } from './store';
import CONFIG from '@pipeline/app-config';
import firebase from 'firebase/app';
import 'firebase/analytics';
import { initializeI18n } from './i18n';
import { actions as authActions, selectors as authSelectors } from './auth';
import { useSelector } from 'react-redux';

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

  firebase.analytics();

  const store = buildStore();

  store.dispatch(authActions.initialize());

  return store;
}

/**
 * A hook that can be used to ensure that the asynchronous tasks of the initialization
 * process are concluded.
 */
export function useBootstrapIsFinished() {
  const isAuthInitialized = useSelector(authSelectors.isInitialized);
  return isAuthInitialized;
}
