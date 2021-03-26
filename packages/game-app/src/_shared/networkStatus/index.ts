/**
 *
 * Listen on connection state and expose a middleware to filter actions in case of offline.
 * Exports the hook {@link useIsOnline} that can be used in any component to listen to network
 *
 * @packageDocumentation
 */
import { networkStatusMiddleware } from './middleware';
import { createNetworkRequiringAction } from './actionCreator';
import { useIsOnline } from './hooks';
import { actions, reducer, selectors, name } from './slice';

export { actions, selectors, createNetworkRequiringAction, networkStatusMiddleware, useIsOnline, reducer, name };
