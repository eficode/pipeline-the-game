import React from 'react';
import styled from 'styled-components';
import { variant } from 'styled-system';

type Variants = 'default' | 'fun';

type Props = {
  id?: string;
  label: string;
  hoverLabel?: string;
  variant?: Variants;
  onClick: () => void;
  disabled?: boolean;
};

const HoverButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border-radius: 24px;
  box-sizing: border-box;
  overflow: hidden;
  color: ${props => props.theme.colors.primary};

  transform: translate(100%);
  opacity: 0;
  background: ${props => props.theme.colors.secondary};
  transition: transform 0.5s;
`;

const HoverButtonContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  transform: translate(-100%);
  transition: transform 0.5s;
`;

const StyledButton = styled('button')<{ variant: Variants }>`
  height: 40px;
  border-radius: 25px;
  padding: 2px 40px;
  cursor: pointer;
  font-family: Montserrat;

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
      default: {
        color: 'white',
        bg: 'primary',
        '&:hover': {
          bg: 'primaryLight',
        },
      },
      fun: {
        color: 'white',
        bg: 'primary',
        '&:hover': {
          [`${HoverButton}`]: {
            transform: 'translate(0.0)',
            zIndex: 1,
            opacity: 1,
          },
          [`${HoverButtonContent}`]: {
            transform: 'translate(0.0)',
          },
        },
      },
    },
  })}
`;

const Button: React.FC<Props> = ({ variant = 'default', label, onClick, id, disabled, hoverLabel }) => {
  return (
    <StyledButton id={id} disabled={disabled} onClick={onClick} variant={variant}>
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
