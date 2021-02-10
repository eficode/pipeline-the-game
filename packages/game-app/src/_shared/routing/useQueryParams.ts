import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

/**
 * Hook to parse query params and get them as object
 */
export function useQueryParams<T = any>() {
  const { search } = useLocation();

  return useMemo(() => {
    return (Object.fromEntries(new URLSearchParams(search).entries()) as unknown) as T;
  }, [search]);
}
