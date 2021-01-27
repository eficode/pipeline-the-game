import React from 'react';
import { ButtonContent, NotHoverIconWrapper, StyledButton, Variants } from './Button.styled';

type Props = {
  id?: string;
  label: string;
  hoverLabel?: string;
  variant?: Variants;
  onClick: () => void;
  disabled?: boolean;
  leftIcon?: React.ReactElement;
  leftIconHover?: React.ReactElement;
  color?: React.ComponentProps<typeof StyledButton>['color'];
};

const Button: React.FC<Props> = ({
  variant = 'default',
  label,
  onClick,
  id,
  disabled,
  hoverLabel,
  leftIcon,
  leftIconHover,
  color,
}) => {
  return (
    <StyledButton
      type="button"
      id={id}
      data-cy={id}
      disabled={disabled}
      onClick={onClick}
      variant={variant}
      color={color}
    >
      <ButtonContent>
        {leftIcon ? <NotHoverIconWrapper>{leftIcon}</NotHoverIconWrapper> : null}
        {label}
      </ButtonContent>
    </StyledButton>
  );
};

Button.displayName = 'Button';

export default Button;
