import React, { useCallback, useMemo, useState } from 'react';
import IconButton from '../IconButton';
import { ButtonsWrapper, FabDialContent, MainButtonIcon } from './FabDial.styled';

type Props = {
  className?: string;
  icon: React.ReactNode;

  buttons: {
    icon: React.ReactNode;
    onClick: () => void;
    autoClose?: boolean;
  }[];
};

const FabDial: React.FC<Props> = ({ icon, buttons, className }) => {
  const [open, setOpen] = useState(false);

  const callbacks = useMemo(() => {
    return buttons.map(b => () => {
      b.onClick();
      b.autoClose && setOpen(false);
    });
  }, [buttons]);

  const toggle = useCallback(() => {
    setOpen(s => !s);
  }, []);

  return (
    <FabDialContent className={className}>
      <MainButtonIcon onClick={toggle} variant="rounded">
        {icon}
      </MainButtonIcon>
      <ButtonsWrapper isOpen={open}>
        {buttons.map((b, index) => (
          <IconButton key={index} variant="rounded" onClick={callbacks[index]}>
            {b.icon}
          </IconButton>
        ))}
      </ButtonsWrapper>
    </FabDialContent>
  );
};

FabDial.displayName = 'FabDial';

export default FabDial;
