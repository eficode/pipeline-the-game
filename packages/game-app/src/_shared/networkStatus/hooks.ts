import { useSelector } from 'react-redux';
import { selectors } from './slice';

/**
 * Returns true if the has network connection
 */
export function useIsOnline(): boolean {
  return useSelector(selectors.getIsOnline);
}
