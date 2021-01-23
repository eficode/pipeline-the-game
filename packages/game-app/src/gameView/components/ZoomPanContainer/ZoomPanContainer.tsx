import React, { useCallback, useEffect, useRef } from 'react';
import { Pan } from '../../types/pan';
import { useZoomPanSetters } from '../ZoomPanContext';
import { containerStyle, contentStyle } from './ZoomPanContainer.style';

type Props = React.PropsWithChildren<{}>;

const scaleFactor = 0.99;
const boardSize = { width: 3840, height: 2160 };

const minScale = Math.max(window.innerWidth / boardSize.width, window.innerHeight / boardSize.height);

/**
 *
 * Limit pans to window boundaries. This way you can not move the board limits inside the window
 *
 * @param {Pan} pan pant that you want to set
 * @param {number} scale current scale
 */
function constrainPan(pan: Pan, scale: number): Pan {
  const panXConstrained = Math.max(Math.min(pan.x, 0), -boardSize.width * scale + window.innerWidth);

  const panYConstrained = Math.max(Math.min(pan.y, 0), -boardSize.height * scale + window.innerHeight);

  return {
    x: panXConstrained,
    y: panYConstrained,
  };
}

/**
 * Compute new pan to keep the cursor position fixed and scale centered
 * at that specific point
 */
function calculateNewPan(newScale: number, currentScale: number, ev: WheelEvent, currentPan: Pan) {
  const recalculatedFactor = newScale / currentScale;

  const mouseWindowX = ev.pageX;
  const mouseWindowY = ev.pageY;

  // https://stackoverflow.com/questions/30002361/image-zoom-centered-on-mouse-position
  const dx = (mouseWindowX - currentPan.x) * (recalculatedFactor - 1);
  const dy = (mouseWindowY - currentPan.y) * (recalculatedFactor - 1);

  const newPanX = currentPan.x - dx;
  const newPanY = currentPan.y - dy;

  return { x: newPanX, y: newPanY };
}

const ZoomPanContainer: React.FC<Props> = ({ children }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>();
  // pan is at board dimension, so scaled
  const isPanning = useRef(false);

  const { panRef, scaleRef, setScaleAndPanRef, setZoomAndPan: setValuesInContext } = useZoomPanSetters();

  const setDivTransformation = useCallback(
    (scale: number, pan: Pan) => {
      contentRef.current!.style.transform = `translate(${pan.x}px, ${pan.y}px) scale(${scale})`;
      setValuesInContext({ scale, pan });
    },
    [setValuesInContext],
  );

  const setZoomAndPanInternal = useCallback(
    ({ scale, pan }: { scale?: number; pan?: Pan }) => {
      const newPan = constrainPan(pan || panRef.current, scale || scaleRef.current);

      if (scale !== undefined) {
        scaleRef.current = scale;
      }
      if (pan !== undefined) {
        panRef.current = newPan;
      }
      setDivTransformation(scaleRef.current, panRef.current);
    },
    [panRef, scaleRef, setDivTransformation],
  );

  const onPointerMove = useCallback(
    (ev: React.PointerEvent) => {
      if (isPanning.current) {
        const currentPan = panRef.current;
        const newPan = {
          x: currentPan.x + ev.movementX,
          y: currentPan.y + ev.movementY,
        };

        setZoomAndPanInternal({ pan: newPan });
      }
    },
    [panRef, setZoomAndPanInternal],
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
      const newPan = calculateNewPan(newScale, currentScale, ev, currentPan);

      setZoomAndPanInternal({ pan: newPan, scale: newScale });
    },
    [panRef, scaleRef, setZoomAndPanInternal],
  );

  useEffect(() => {
    setScaleAndPanRef.current = setZoomAndPanInternal;
  }, [setZoomAndPanInternal, setScaleAndPanRef]);

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
