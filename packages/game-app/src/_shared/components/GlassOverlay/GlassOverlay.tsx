import React, { useEffect, useState } from 'react';
import { Overlay, OverlayContentWrapper } from './GlassOverlay.styled';
import { createPortal } from 'react-dom';

type Props = {
  open?: boolean;
};

const GlassOverlay: React.FC<Props> = ({ children, open }) => {
  const [internalState, setInternalState] = useState<'opening' | 'open' | 'closed' | 'closing'>(
    open ? 'open' : 'closed',
  );

  useEffect(() => {
    if (!open && internalState === 'open') {
      setInternalState('closing');
      setTimeout(() => {
        setInternalState('closed');
      }, 500);
    } else if (open && internalState !== 'open') {
      setInternalState('opening');
      setTimeout(() => {
        setInternalState('open');
      }, 500);
    }
  }, [internalState, open]);

  return internalState !== 'closed'
    ? createPortal(
        <Overlay isClosing={internalState === 'closing'} isOpening={internalState === 'opening'}>
          <OverlayContentWrapper>{children}</OverlayContentWrapper>
        </Overlay>,
        document.body,
      )
    : null;
};

GlassOverlay.displayName = 'OverlayDialog';

export default GlassOverlay;
