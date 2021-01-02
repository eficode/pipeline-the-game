import { useSelector } from 'react-redux';
import { selectors } from './slice';

/**
 * Get current logged user info. null if not logged.
 */
export default function useLoggedUser() {
  const loggedUser = useSelector(selectors.getCurrentUser);
  return loggedUser;
}
