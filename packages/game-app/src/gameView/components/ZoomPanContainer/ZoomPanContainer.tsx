import React, { useRef } from 'react';

type Pan = {
  x: number;
  y: number;
};

type Props = React.PropsWithChildren<{
  panRef: React.MutableRefObject<Pan>;
  scaleRef: React.MutableRefObject<number>;
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

const ZoomPanContainer: React.FC<Props> = ({ children, panRef, scaleRef }) => {
  const divRef = useRef<HTMLDivElement>(null);
  // pan is at board dimension
  const isPanning = useRef(false);

  function onPointerDown(ev: React.PointerEvent) {
    console.debug('target', ev.target);
    console.debug('current', divRef.current);
    isPanning.current = true;
    divRef.current!.addEventListener('pointermove', onPointerMove as any);
  }

  function onPointerUp(ev: React.PointerEvent) {
    isPanning.current = false;
    divRef.current!.removeEventListener('pointermove', onPointerMove as any);
  }

  function onPointerMove(ev: React.PointerEvent) {
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
      divRef.current!.style.transform = `translate(${newPan.x}px, ${newPan.y}px) scale(${currentScale})`;

      panRef.current = newPan;
    }
  }

  function onWheel(ev: React.WheelEvent) {
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

    divRef.current!.style.transform = `translate(${newPan.x}px, ${newPan.y}px) scale(${newScale})`;

    scaleRef.current = newScale;
    panRef.current = newPan;
  }

  console.debug('rendering ZoomPanContainer');

  return (
    <div
      ref={divRef}
      onWheel={onWheel}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={{
        transformOrigin: '0px 0px',
        width: 'fit-content',
        height: 'fit-content',
        userSelect: 'none',
      }}
    >
      {children}
    </div>
  );
};

ZoomPanContainer.displayName = 'ZoomPanContainer';

export default React.memo(ZoomPanContainer);
