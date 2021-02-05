import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { RoutingPath } from './routingPath';

/**
 *
 * Returns a memoized callback to imperatively navigate outside the app
 *
 * @param url the url to go
 * @param openNewTab flag to open a new tab
 */
export default function useNavigateOutsideTo(url: string, openNewTab?: boolean) {
  return useCallback(() => {
    window.open(url, openNewTab ? '_blank' : undefined);
  }, [url, openNewTab]);
}
