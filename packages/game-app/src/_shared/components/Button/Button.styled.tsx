import styled from 'styled-components';
import { variant } from 'styled-system';

export type Variants = 'default' | 'fun';

export const HoverButton = styled.div`
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

export const HoverButtonContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  transform: translate(-100%);
  transition: transform 0.5s;
  font-weight: 600;
`;

export const StyledButton = styled('button')<{ variant: Variants }>`
  height: 40px;
  border-radius: 4px;
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
        textTransform: 'uppercase',
        fontWeight: '600',
        bg: 'secondary',
        '&:hover': {
          bg: 'secondaryDark',
        },
      },
      fun: {
        textTransform: 'uppercase',
        fontWeight: '600',
        bg: 'secondary',
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
