import React from 'react';
import {
  ButtonContent,
  ButtonLabel,
  ButtonSpinner,
  NotHoverIconWrapper,
  StyledButton,
  Variants,
} from './Button.styled';

type Props = {
  id?: string;
  testId?: string;
  label: string;
  variant?: Variants;
  onClick: () => void;
  disabled?: boolean;
  leftIcon?: React.ReactElement;
  color?: React.ComponentProps<typeof StyledButton>['color'];
  loading?: boolean;
  type?: React.ComponentProps<typeof StyledButton>['type'];
};

const Button: React.FC<Props> = ({
  variant = 'default',
  label,
  onClick,
  id,
  testId,
  disabled,
  leftIcon,
  color,
  type = 'button',
  loading,
}) => {
  return (
    <StyledButton
      type={type}
      id={id}
      data-cy={testId || id}
      disabled={disabled || loading}
      onClick={onClick}
      variant={variant}
      color={color}
    >
      <ButtonContent>
        {leftIcon ? <NotHoverIconWrapper>{leftIcon}</NotHoverIconWrapper> : null}
        {loading && <ButtonSpinner />}
        <ButtonLabel loading={loading}>{label}</ButtonLabel>
      </ButtonContent>
    </StyledButton>
  );
};

Button.displayName = 'Button';

export default Button;
