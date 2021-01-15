import React from 'react';
import styled from 'styled-components';
import { variant } from 'styled-system';

type Variants = 'primary' | 'secondary';

type Props = {
  id?: string;
  label: string;
  variant?: Variants;
  onClick: () => void;
  disabled?: boolean;
};

const StyledButton = styled('button')<{ variant: Variants }>`
  height: 40px;
  border-radius: 25px;
  padding: 2px 40px;

  box-sizing: border-box;
  border: 0;
  position: relative;
  overflow: hidden;

  &:hover,
  &:active,
  &:focus {
    outline: none;
  }

  ${variant({
    variants: {
      primary: {
        color: 'white',
        bg: 'primary',
        '&:hover': {
          bg: ' ',
        },
      },
      secondary: {
        color: 'white',
        bg: 'secondary',
      },
    },
  })}
`;

const Button: React.FC<Props> = ({ variant = 'primary', label, onClick, id, disabled }) => {
  return (
    <StyledButton id={id} disabled={disabled} onClick={onClick} variant={variant}>
      {label}
    </StyledButton>
  );
};

Button.displayName = 'Button';

export default Button;
