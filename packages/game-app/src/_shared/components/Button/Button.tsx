import React from 'react';
import {
  ButtonContent,
  ButtonLabel,
  ButtonSpinner,
  HoverIconWrapper,
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
  rightIcon?: React.ReactElement;
  leftIconHover?: React.ReactElement;
  rightIconHover?: React.ReactElement;
  color?: React.ComponentProps<typeof StyledButton>['color'];
  loading?: boolean;
  type?: React.ComponentProps<typeof StyledButton>['type'];
  tabIndex?: React.ComponentProps<typeof StyledButton>['tabIndex'];
};

const Button: React.FC<Props> = ({
  variant = 'default',
  label,
  onClick,
  id,
  testId,
  disabled,
  leftIcon,
  leftIconHover,
  color,
  type = 'button',
  loading,
  rightIcon,
  rightIconHover,
  tabIndex,
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
      tabIndex={tabIndex}
    >
      <ButtonContent>
        {leftIcon ? <NotHoverIconWrapper variant="small">{leftIcon}</NotHoverIconWrapper> : null}
        {leftIconHover || leftIcon ? (
          <HoverIconWrapper variant="small">{leftIconHover || leftIcon!}</HoverIconWrapper>
        ) : null}
        {loading && <ButtonSpinner />}
        <ButtonLabel loading={loading}>{label}</ButtonLabel>
        {rightIcon ? (
          <NotHoverIconWrapper ml={3} variant="small">
            {rightIcon}
          </NotHoverIconWrapper>
        ) : null}
        {rightIconHover || rightIcon ? (
          <HoverIconWrapper ml={3} variant="small">
            {rightIconHover || rightIcon!}
          </HoverIconWrapper>
        ) : null}
      </ButtonContent>
    </StyledButton>
  );
};

Button.displayName = 'Button';

export default Button;
