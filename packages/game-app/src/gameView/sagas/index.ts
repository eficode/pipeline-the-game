import { all } from 'redux-saga/effects';
import loadGards from './loadCards';

export default function* gameSaga() {
  yield all([loadGards()]);
}
