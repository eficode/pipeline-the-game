import { useCallback, useEffect, useRef } from 'react';

export default function useDoubleClick(handler: () => void) {
  const intervalRef = useRef(0);
  const counterRef = useRef(0);
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  const fire = useCallback(() => {
    clearTimeout(intervalRef.current);
    if (counterRef.current === 0) {
      counterRef.current = intervalRef.current + 1;

      intervalRef.current = setTimeout(() => {
        counterRef.current = 0;
      }, 200) as any;
    } else {
      counterRef.current = 0;
      handlerRef.current();
    }
  }, []);

  return fire;
}
