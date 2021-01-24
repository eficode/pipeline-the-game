import React, { useMemo, useState } from 'react';
import IconButton from '../IconButton';
import styled, { css } from 'styled-components';

type Props = {
  className?: string;
  icon: React.ReactNode;

  buttons: {
    icon: React.ReactNode;
    onClick: () => void;
    autoClose?: boolean;
  }[];
};

const ButtonsWrapper = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;

  ${IconButton} {
    transition: transform 0.5s;
    position: absolute;
    top: 0;
    transform: translate(0, 0);
  }

  ${props =>
    props.isOpen &&
    css`
      ${IconButton}:nth-child(3) {
        transform: translate(0, -48px);
      }

      ${IconButton}:nth-child(2) {
        transform: translate(0, -96px);
      }

      ${IconButton}:nth-child(1) {
        transform: translate(0, -144px);
      }
    `}
`;

const MainButtonIcon = styled(IconButton)`
  position: absolute;

  z-index: 1;
`;

const FabDial: React.FC<Props> = ({ icon, buttons, className }) => {
  const [open, setOpen] = useState(false);

  const callbacks = useMemo(() => {
    return buttons.map(b => () => {
      b.onClick();
      b.autoClose && setOpen(false);
    });
  }, [buttons]);

  return (
    <div style={{ position: 'relative', width: '40px', height: '40px' }} className={className}>
      <MainButtonIcon onClick={() => setOpen(s => !s)} variant="rounded">
        {icon}
      </MainButtonIcon>
      <ButtonsWrapper isOpen={open}>
        {buttons.map((b, index) => (
          <IconButton key={index} variant="rounded" onClick={callbacks[index]}>
            {b.icon}
          </IconButton>
        ))}
      </ButtonsWrapper>
    </div>
  );
};

FabDial.displayName = 'FabDial';

export default FabDial;
