import { Path } from '../i18n/utils';
import { DefaultTheme } from 'styled-components';
import { useState, useEffect } from 'react';

export function getFromTheme(type: Path<DefaultTheme>) {
  return ({ theme }: { theme: DefaultTheme }) =>
    (type.split('.').reduce((o, i) => o[i as keyof typeof o] as any, theme) as unknown) as string;
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
