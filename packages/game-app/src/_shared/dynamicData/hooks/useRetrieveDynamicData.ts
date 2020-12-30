import { createRequestHook } from '@pipeline/requests-status';
import { actions } from '@pipeline/dynamicData';

const useRetrieveGameRoles = createRequestHook('gameRoles', actions.retrieveGameRoles, {
  errorMessagesScope: '', //TODO
});

const useRetrieveDevOpsMaturities = createRequestHook('devOpsMaturities', actions.retrieveDevOpsMaturities, {
  errorMessagesScope: '', //TODO
});

export { useRetrieveGameRoles, useRetrieveDevOpsMaturities };
