import { createRequestHook } from '@pipeline/requests-status';
import { actions, selectors } from '@pipeline/dynamicData';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const useRetrieveGameRolesInternal = createRequestHook('gameRoles', actions.retrieveGameRoles, {
  errorMessagesScope: '', //TODO
});

function useGameRoles() {
  const { call: retrieveGameRoles } = useRetrieveGameRolesInternal();

  const gameRoles = useSelector(selectors.getGameRoles);

  useEffect(() => {
    if (!gameRoles || gameRoles.length === 0) {
      retrieveGameRoles();
    }
  }, [gameRoles, retrieveGameRoles]);

  return gameRoles;
}

const useRetrieveDevOpsMaturitiesInternal = createRequestHook('devOpsMaturities', actions.retrieveDevOpsMaturities, {
  errorMessagesScope: '', //TODO
});

function useDevOpsMaturities() {
  const { call: retrieveDevOpsMaturities } = useRetrieveDevOpsMaturitiesInternal();

  const devOpsMaturities = useSelector(selectors.getDevOpsMaturities);

  useEffect(() => {
    if (!devOpsMaturities || devOpsMaturities.length === 0) {
      retrieveDevOpsMaturities();
    }
  }, [devOpsMaturities, retrieveDevOpsMaturities]);

  return devOpsMaturities;
}

export { useGameRoles, useDevOpsMaturities };
