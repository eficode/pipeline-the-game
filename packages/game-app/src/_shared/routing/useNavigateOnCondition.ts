import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RoutingPath } from './routingPath';

/**
 *
 * Conditionally navigate to the provided route once the condition becomes true
 *
 * @param condition the condition to check
 * @param route the route to go
 */
export default function useNavigateOnCondition<State = any>(
  condition: boolean,
  route: RoutingPath | string,
  state?: State,
) {
  const [alreadyNavigated, setAlreadyNavigated] = useState<boolean>(false);

  const history = useHistory();

  useEffect(() => {
    if (condition && !alreadyNavigated) {
      history.push(route, state);
      setAlreadyNavigated(true);
    }
  }, [condition, history, route, alreadyNavigated, state]);
}
