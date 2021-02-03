import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import rootSaga from './rootSaga';
import { networkStatusMiddleware } from '@pipeline/networkStatus';

const sagaMiddleware = createSagaMiddleware();

export default function buildStore() {
  const store = configureStore({
    reducer: reducers,
    middleware: [networkStatusMiddleware, sagaMiddleware],
  });

  sagaMiddleware.run(rootSaga);
  return store;
}
