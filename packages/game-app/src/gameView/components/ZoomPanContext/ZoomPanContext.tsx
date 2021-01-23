import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Pan } from '../../types/pan';

type Props = {
  initialScale?: number;
  initialPan?: Pan;
};

export type ZoomPanValues = {
  scale: number;
  pan: Pan;
};

export type ZoomPanRefs = {
  scaleRef: React.MutableRefObject<number>;
  panRef: React.MutableRefObject<Pan>;
  setScaleAndPanRef: React.MutableRefObject<(props: { scale?: number; pan?: Pan }) => void>;
};

export type ZoomPanSetter = {
  setZoomAndPan: (props: { scale?: number; pan?: Pan }) => void;
} & ZoomPanRefs;

export const ZoomPanValuesContext = React.createContext<ZoomPanValues>({} as ZoomPanValues);

export const ZoomPanRefsContext = React.createContext<ZoomPanRefs>({} as ZoomPanRefs);

export const ZoomPanSetterContext = React.createContext<ZoomPanSetter>({} as ZoomPanSetter);

/**
 * Zoom pan context value
 */
const ZoomPan: React.FC<Props> = ({ children, initialScale, initialPan }) => {
  const [state, setState] = useState<ZoomPanValues>({
    pan: initialPan || { x: 0, y: 0 },
    scale: initialScale || 1,
  });

  const setZoomAndPan = useCallback((props: Partial<ZoomPanValues>) => {
    setState(s => ({ ...s, ...props }));
  }, []);

  const scaleRef = useRef(initialScale || 1);
  const panRef = useRef(initialPan || { x: 0, y: 0 });
  const setScaleAndPanRef = useRef((props: { scale?: number; pan?: Pan }) => ({}));

  const refsState = useMemo(() => {
    return {
      panRef: panRef,
      setScaleAndPanRef: setScaleAndPanRef,
      scaleRef: scaleRef,
    } as ZoomPanRefs;
  }, []);

  const setterState = useMemo(() => {
    return {
      panRef: panRef,
      setScaleAndPanRef: setScaleAndPanRef,
      scaleRef: scaleRef,
      setZoomAndPan: setZoomAndPan,
    } as ZoomPanSetter;
  }, [setZoomAndPan]);

  return (
    <ZoomPanValuesContext.Provider value={state}>
      <ZoomPanRefsContext.Provider value={refsState}>
        <ZoomPanSetterContext.Provider value={setterState}>{children}</ZoomPanSetterContext.Provider>
      </ZoomPanRefsContext.Provider>
    </ZoomPanValuesContext.Provider>
  );
};

ZoomPan.displayName = 'ZoomPan';

export default ZoomPan;
