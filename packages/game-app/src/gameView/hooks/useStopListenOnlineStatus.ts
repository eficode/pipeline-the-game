import { batch, useDispatch } from 'react-redux';
import { actions as loadBalancerActions } from '../../loadBalancer/slice';
import { useEffect } from 'react';

export default function useStopListenOnlineStatus() {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      batch(() => {
        dispatch(loadBalancerActions.stopListenToOnlineStatus());
      });
    };
  }, [dispatch]);
}