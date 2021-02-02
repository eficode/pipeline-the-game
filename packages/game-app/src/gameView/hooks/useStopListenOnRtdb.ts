import { batch, useDispatch } from 'react-redux';
import { actions as loadBalancerActions } from '../../userGameStatus/slice';
import { actions as gameActions } from '../slice';
import { useEffect } from 'react';

export default function useStopListenOnRtdb() {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      batch(() => {
        dispatch(loadBalancerActions.stopListenToOnlineStatus());
        dispatch(gameActions.stopListenOnGame());
      });
    };
  }, [dispatch]);
}
