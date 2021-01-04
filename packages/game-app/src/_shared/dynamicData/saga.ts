import { call, put, takeEvery } from 'redux-saga/effects';
import { addRequestStatusManagement } from '@pipeline/requests-status';
import { executeRetrieveDevOpsMaturities, executeRetrieveGameRoles } from './apis/retrieveDynamicData';
import { actions } from './slice';
import { DevOpsMaturitiesDoc, GameRolesDoc } from '@pipeline/common';

function* retrieveGameRolesSaga() {
  try {
    const gameRoles: GameRolesDoc = yield call(executeRetrieveGameRoles);
    yield put(actions.setGameRoles(gameRoles));
  } catch (e) {
    throw e;
  }
}

function* retrieveDevOpsMaturitiesSaga() {
  try {
    const devOpsMaturities: DevOpsMaturitiesDoc = yield call(executeRetrieveDevOpsMaturities);
    yield put(actions.setDevOpsMaturities(devOpsMaturities));
  } catch (e) {
    throw e;
  }
}

export function* runRetrieveGameRoles() {
  yield takeEvery(actions.retrieveGameRoles, addRequestStatusManagement(retrieveGameRolesSaga, 'gameRoles'));
}

export function* runRetrieveDevOpsMaturities() {
  yield takeEvery(
    actions.retrieveGameRoles,
    addRequestStatusManagement(retrieveDevOpsMaturitiesSaga, 'devOpsMaturities'),
  );
}
