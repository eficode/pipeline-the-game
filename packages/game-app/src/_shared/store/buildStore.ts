import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import rootSaga from './rootSaga';
import { networkStatusMiddleware } from '@pipeline/networkStatus';
import CONFIG from '@pipeline/app-config';

const sagaMiddleware = createSagaMiddleware();

export default function buildStore() {
  const store = configureStore({
    reducer: reducers,
    middleware: [networkStatusMiddleware, sagaMiddleware],
    devTools: CONFIG.REACT_APP_ENV !== 'prod',
  });

  sagaMiddleware.run(rootSaga);
  return store;
}
