/**
 *
 * Initial and really simple analytics package that connects to Hubspot sending events
 * and identifying user
 *
 * @packageDocumentation
 */
import { createAction } from '@reduxjs/toolkit';
import { call, takeEvery } from 'redux-saga/effects';

const identify = createAction<{ email: string } & object>('analytics/identify');

export const actions = {
  identify,
};

export function* identifySaga(action: ReturnType<typeof actions.identify>) {
  yield call(() => {
    window?._hsq?.push(['identify', action.payload]);
    window?._hsq?.push(['trackPageView']);
  });
}

export function* saga() {
  yield takeEvery(actions.identify, identifySaga);
}
