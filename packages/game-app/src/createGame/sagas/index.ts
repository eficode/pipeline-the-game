import { all } from 'redux-saga/effects';
import createGame from './createGame';

export default function* createGameSaga() {
  yield all([createGame()]);
}
