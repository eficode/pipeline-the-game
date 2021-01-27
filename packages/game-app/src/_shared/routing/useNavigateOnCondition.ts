import { useEffect, useState } from 'react';
import { RoutingPath } from './routingPath';
import useNavigateTo from './useNavigateTo';

/**
 *
 * Conditionally navigate to the provided route once the condition becomes true
 *
 * @param condition the condition to check
 * @param route the route to go
 * @param state navigation state
 */
export default function useNavigateOnCondition<State = any>(
  condition: boolean,
  route: RoutingPath | string,
  state?: State,
) {
  const [alreadyNavigated, setAlreadyNavigated] = useState<boolean>(false);

  const navigate = useNavigateTo(route, state);

  useEffect(() => {
    if (condition && !alreadyNavigated) {
      navigate();
      setAlreadyNavigated(true);
    }
  }, [condition, alreadyNavigated, navigate]);
}
