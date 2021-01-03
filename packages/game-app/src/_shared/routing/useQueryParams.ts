import { useLocation } from 'react-router-dom';

/**
 * Hook to parse query params and get them as object
 */
export function useQueryParams<T = any>() {
  const { search } = useLocation();
  return (Object.fromEntries(new URLSearchParams(search).entries()) as unknown) as T;
}
