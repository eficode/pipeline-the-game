import { useCallback, useState } from 'react';

export default function useDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen(s => !s);
  }, []);

  return {
    isOpen,
    close,
    open,
    toggle,
  };
}
