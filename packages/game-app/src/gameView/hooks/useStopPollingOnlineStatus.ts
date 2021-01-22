import { batch, useDispatch } from 'react-redux';
import { actions as loadBalancerActions } from '../../loadBalancer/slice';
import { useEffect } from 'react';

export default function useStopPollingOnlineStatus() {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      batch(() => {
        dispatch(loadBalancerActions.stopPollingOnlineStatus());
        dispatch(loadBalancerActions.stopListenToOnlineStatus());
      });
    };
  }, [dispatch]);
}
