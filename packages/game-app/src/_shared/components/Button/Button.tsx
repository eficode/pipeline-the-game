import React from 'react';
import { HoverButton, HoverButtonContent, StyledButton, Variants } from './Button.styled';

type Props = {
  id?: string;
  label: string;
  hoverLabel?: string;
  variant?: Variants;
  onClick: () => void;
  disabled?: boolean;
};

const Button: React.FC<Props> = ({ variant = 'default', label, onClick, id, disabled, hoverLabel }) => {
  return (
    <StyledButton type="button" id={id} disabled={disabled} onClick={onClick} variant={variant}>
      {label}
      <HoverButton>
        <HoverButtonContent>
          <span>{hoverLabel || label}</span>
        </HoverButtonContent>
      </HoverButton>
    </StyledButton>
  );
};

Button.displayName = 'Button';

export default Button;
