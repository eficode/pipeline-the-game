import { Store } from '@reduxjs/toolkit';
import I18n from 'i18n-js';
import firebase from 'firebase/app';

/**
 * Makes I18n and the store available for Cypress in order
 * to use them during the e2e tests.
 */
export function makeCypressHappy(store: Store) {
  firebase.firestore().settings({ experimentalForceLongPolling: true });

  (window as any).store = store;
  (window as any).i18n = I18n;
  (window as any).firebase = firebase;
}
