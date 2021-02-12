import React, { useCallback, useMemo, useState } from 'react';
import IconButton from '../IconButton';
import { ButtonsWrapper, FabDialContent, MainButtonIcon } from './FabDial.styled';

type Props = {
  className?: string;
  icon: React.ReactNode;
  id?: string;

  buttons: {
    icon: React.ReactNode;
    tooltipLabel?: React.ReactNode;
    onClick: () => void;
    autoClose?: boolean;
    id?: string;
  }[];
};

const FabDial: React.FC<Props> = ({ icon, buttons, className, id }) => {
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
      <MainButtonIcon id={id} onClick={toggle} variant="rounded">
        {icon}
      </MainButtonIcon>
      <ButtonsWrapper isOpen={open}>
        {buttons.map((b, index) => (
          <IconButton
            key={index}
            variant="rounded"
            onClick={callbacks[index]}
            tooltipLabel={b.tooltipLabel}
            tooltipPosition="left"
            id={b.id}
          >
            {b.icon}
          </IconButton>
        ))}
      </ButtonsWrapper>
    </FabDialContent>
  );
};

FabDial.displayName = 'FabDial';

export default FabDial;
