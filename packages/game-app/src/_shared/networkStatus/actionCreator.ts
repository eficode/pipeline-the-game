import { createAction, PayloadActionCreator } from '@reduxjs/toolkit';

export function createNetworkRequiringAction<P = void, T extends string = string>(type: T): PayloadActionCreator<P, T>;

/**
 * Use like createAction, it adds a meta param that is used by the middleware to filter out
 * actions in case of no network
 */
export function createNetworkRequiringAction(type: any) {
  return createAction(type, (payload: any) => {
    return {
      payload: payload,
      meta: {
        networkRequired: true,
      },
    };
  });
}
