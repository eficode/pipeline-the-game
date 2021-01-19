import React from 'react';
import styled, { css } from 'styled-components';
import { variant } from 'styled-system';

type IconButtonVariants = 'default' | 'rounded';

type Props = {
  onClick: () => void;
  className?: string;
  active?: boolean;
  variant?: IconButtonVariants;
};

const StyledButton = styled.button<{ active?: boolean; variant: IconButtonVariants }>`
  background-color: transparent;
  border: none;
  padding: 8px;
  color: #b4aea9;
  border-radius: 10px;
  width: 40px;
  height: 40px;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    color: #00867c;
  }

  &:active {
    background: #eeeeee;
    color: #00867c;
  }

  ${props =>
    props.active &&
    css`
      background: #eeeeee;
      color: #00867c;
    `} ${variant({
    variants: {
      rounded: {
        borderRadius: '50%',
        background: '#FFFFFF',
        '&> *:first-child': {
          width: '16px',
          height: '16px',
          transition: 'transform 0.3s',
        },
        ':hover': {
          '&> *:first-child': {
            transform: 'rotate(20deg) scale(1.2)',
          },
        },
      },
    },
  })}
`;

const IconButton: React.FC<Props> = ({ children, onClick, className, active, variant = 'default' }) => {
  return (
    <StyledButton type="button" variant={variant} onClick={onClick} className={className} active={active}>
      {children}
    </StyledButton>
  );
};

IconButton.displayName = 'IconButton';

export default styled(IconButton)``;
