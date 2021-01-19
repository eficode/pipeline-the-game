import styled, { css } from 'styled-components';
import { variant } from 'styled-system';
import { getFromTheme } from '../utils';

export type IconButtonVariants = 'default' | 'rounded' | 'clear';

export const StyledButton = styled.button<{ active?: boolean; variant: IconButtonVariants }>`
  background-color: transparent;
  border: none;
  padding: 8px;
  color: ${getFromTheme('iconButton.variants.default.background')};
  border-radius: 10px;
  width: 40px;
  height: 40px;
  box-sizing: border-box;
  cursor: pointer;

  :focus {
    outline: none;
  }

  &:hover {
    color: #00867c;
  }

  ${props =>
    props.active &&
    css`
      background: #eeeeee;
      color: #00867c;
    `}

  ${variant({
    variants: {
      default: {
        '&:active': {
          background: '#eeeeee',
          color: '#00867c',
        },
      },
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

StyledButton.displayName = 'StyledButton';
