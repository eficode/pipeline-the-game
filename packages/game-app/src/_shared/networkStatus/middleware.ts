import { Middleware } from 'redux';
import { actions, selectors } from './slice';

/**
 * middleware to listen on network status and filter out action requiring network when offline
 */
export const networkStatusMiddleware: Middleware<any> = store => next => action => {
  const shouldSkipAction = action?.meta?.networkRequired && !selectors.getIsOnline(store.getState());

  if (actions.listenToNetwork.match(action)) {
    window.addEventListener('offline', function (e) {
      store.dispatch(actions.setStatus(false));
    });

    window.addEventListener('online', function (e) {
      store.dispatch(actions.setStatus(true));
    });
    store.dispatch(actions.setStatus(navigator.onLine));
  }

  if (!shouldSkipAction) {
    return next(action);
  }
};
