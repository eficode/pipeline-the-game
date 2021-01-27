import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { RoutingPath } from './routingPath';

/**
 *
 * Returns a memoized callback to imperatively navigate to the provided path
 *
 * @param route the route to go
 * @param state navigation state
 */
export default function useNavigateTo<State = any>(route: RoutingPath | string, state?: State) {
  const history = useHistory();

  const navigate = useCallback(() => {
    history.push(route, state);
  }, [history, route, state]);

  return navigate;
}
