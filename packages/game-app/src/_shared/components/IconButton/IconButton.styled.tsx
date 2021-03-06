import styled, { css } from 'styled-components';
import { variant } from 'styled-system';
import { getFromTheme } from '../utils';

export type IconButtonVariants = 'default' | 'rounded' | 'clear' | 'clearSmall';

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
    `} ${variant({
    variants: {
      default: {
        '&:active': {
          background: '#eeeeee',
          color: '#00867c',
        },
        '& > svg': {
          width: '24px',
          height: '24px',
        },
      },
      clear: {
        '& > svg': {
          width: '24px',
          height: '24px',
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
      clearSmall: {
        width: '24px',
        height: '24px',
        padding: '4px',
      },
    },
  })}
`;

StyledButton.displayName = 'StyledButton';

export const IconTooltip = styled.span`
  padding: 3px 8px;
  height: 24px;
  background: #2c3644;
  border-radius: 10px;
  color: white;
  font-size: 14px;
`;

IconTooltip.displayName = 'IconTooltip';
