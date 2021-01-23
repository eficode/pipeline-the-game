import React, { useCallback, useEffect, useRef } from 'react';

export type Pan = {
  x: number;
  y: number;
};

type Props = React.PropsWithChildren<{
  panRef: React.MutableRefObject<Pan>;
  scaleRef: React.MutableRefObject<number>;
  setZoomPanRef: React.MutableRefObject<({ scale, pan }: { scale?: number; pan?: Pan }) => void>;
}>;

const scaleFactor = 0.99;

const minScale = Math.max(window.innerWidth / 3840, window.innerHeight / 2160);

const boardSize = { width: 3840, height: 2160 };

function constrainPan(pan: Pan, scale: number): Pan {
  const panXConstrained = Math.max(Math.min(pan.x, 0), -boardSize.width * scale + window.innerWidth);

  const panYConstrained = Math.max(Math.min(pan.y, 0), -boardSize.height * scale + window.innerHeight);

  return {
    x: panXConstrained,
    y: panYConstrained,
  };
}

const containerStyle = {
  margin: '0',
  padding: '0',
  userSelect: 'none' as const,
  width: 'fit-content' as const,
  height: 'fit-content' as const,
  overflow: 'hidden' as const,
  position: 'relative' as const,
};

const contentStyle = {
  transformOrigin: '0px 0px',
  margin: '0',
  padding: '0',
  display: 'flex' as const,
  flexWrap: 'wrap' as const,
};

const ZoomPanContainer: React.FC<Props> = ({ children, panRef, scaleRef, setZoomPanRef }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>();
  // pan is at board dimension
  const isPanning = useRef(false);

  const setTransformation = useCallback((scale: number, pan: Pan) => {
    contentRef.current!.style.transform = `translate(${pan.x}px, ${pan.y}px) scale(${scale})`;
  }, []);

  const onPointerMove = useCallback(
    (ev: React.PointerEvent) => {
      if (isPanning.current) {
        const currentScale = scaleRef.current;
        const currentPan = panRef.current;
        const newPan = constrainPan(
          {
            x: currentPan.x + ev.movementX,
            y: currentPan.y + ev.movementY,
          },
          currentScale,
        );
        contentRef.current!.style.transform = `translate(${newPan.x}px, ${newPan.y}px) scale(${currentScale})`;

        panRef.current = newPan;
      }
    },
    [panRef, scaleRef],
  );

  const onPointerDown = useCallback(
    (ev: React.PointerEvent) => {
      isPanning.current = true;
      contentRef.current!.addEventListener('pointermove', onPointerMove as any);
    },
    [onPointerMove],
  );

  const onPointerUp = useCallback(
    (ev: React.PointerEvent) => {
      isPanning.current = false;
      contentRef.current!.removeEventListener('pointermove', onPointerMove as any);
    },
    [onPointerMove],
  );

  const onWheel = useCallback(
    (ev: WheelEvent) => {
      ev.preventDefault();
      ev.stopPropagation();

      const delta = ev.deltaY;
      const currentScale = scaleRef.current;
      const currentPan = panRef.current;

      let factor = scaleFactor;
      if (delta < 0) {
        factor = 1 / factor;
      }

      const newScale = Math.max(currentScale * factor, minScale);
      const recalculatedFactor = newScale / currentScale;

      const mouseWindowX = ev.pageX;
      const mouseWindowY = ev.pageY;

      // https://stackoverflow.com/questions/30002361/image-zoom-centered-on-mouse-position
      const dx = (mouseWindowX - currentPan.x) * (recalculatedFactor - 1);
      const dy = (mouseWindowY - currentPan.y) * (recalculatedFactor - 1);

      const newPanX = currentPan.x - dx;
      const newPanY = currentPan.y - dy;

      const newPan = constrainPan({ x: newPanX, y: newPanY }, newScale);

      contentRef.current!.style.transform = `translate(${newPan.x}px, ${newPan.y}px) scale(${newScale})`;

      scaleRef.current = newScale;
      panRef.current = newPan;
    },
    [panRef, scaleRef],
  );

  const setZoomPan = useCallback(
    ({ scale, pan }: { scale?: number; pan?: Pan }) => {
      const newPan = constrainPan(pan || panRef.current, scale || scaleRef.current);

      if (scale !== undefined) {
        scaleRef.current = scale;
      }
      if (pan !== undefined) {
        panRef.current = newPan;
      }
      setTransformation(scaleRef.current, panRef.current);
    },
    [panRef, scaleRef, setTransformation],
  );

  useEffect(() => {
    setZoomPanRef.current = setZoomPan;
  }, [setZoomPan, setZoomPanRef]);

  const setRef = useCallback(
    (ref: HTMLDivElement) => {
      if (ref) {
        ref.addEventListener('wheel', onWheel, { passive: false });
      } else {
        containerRef.current && containerRef.current.removeEventListener('wheel', onWheel);
      }
      containerRef.current = ref;
    },
    [onWheel],
  );

  return (
    <div key="zoom-container" ref={setRef} style={containerStyle}>
      <div
        ref={contentRef}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={contentStyle}
      >
        {children}
      </div>
    </div>
  );
};

ZoomPanContainer.displayName = 'ZoomPanContainer';

export default React.memo(ZoomPanContainer);
