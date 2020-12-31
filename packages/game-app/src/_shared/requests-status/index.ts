/**
 * Manage centralized loading and errors for async requests.
 *
 * State containing loading error and success status for each request key.
 *
 * The package provides a saga utils that adds the request management automatically
 * the {@link addRequestStatusManagement} wrapper.
 *
 * Looking at the request status is easy with the hook generator {@link createRequestHook}
 *
 * @packageDocumentation
 */
import reducer, { actions, name } from './slice';
import { RequestsKeys } from './requestsKeys';
import { addRequestStatusManagement } from './sagaIntegrations';
import { selectRequestStatus } from './selectors';
import { GeneralHookResponse, RequestStatus } from './types';
import { createRequestHook } from './createRequestHook';

export { actions, addRequestStatusManagement, createRequestHook, name, reducer, selectRequestStatus };

export type { GeneralHookResponse, RequestStatus, RequestsKeys };
