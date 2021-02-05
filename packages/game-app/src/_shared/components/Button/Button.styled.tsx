import styled, { css } from 'styled-components';
import { variant, color } from 'styled-system';
import Icon from '../Icon';
import Spinner from '../Spinner';
import Typography from '../Typography';

export type Variants = 'default' | 'clear';

export const StyledButton = styled('button')<{ variant: Variants }>`
  height: 40px;
  min-width: 200px;
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
      clear: {
        bg: 'transparent',
        color: 'white',
        p: '2px 16px',
      },
    },
  })} ${color}
`;

StyledButton.displayName = 'StyledButton';

export const ButtonContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

ButtonContent.displayName = 'ButtonContent';

export const IconWrapper = styled(Icon)`
  ${StyledButton} & {
    margin-right: 4px;
  }
`;

IconWrapper.displayName = 'IconWrapper';

export const NotHoverIconWrapper = styled(IconWrapper)`
  ${StyledButton}:hover & {
    display: none;
  }
`;

NotHoverIconWrapper.displayName = 'NotHoverIconWrapper';

export const HoverIconWrapper = styled(IconWrapper)`
  ${StyledButton}:not(:hover)   & {
    display: none;
  }
`;

HoverIconWrapper.displayName = 'HoverIconWrapper';

export const ButtonSpinner = styled(Spinner)`
  position: absolute;
`;

ButtonSpinner.displayName = 'ButtonSpinner';

export const ButtonLabel = styled(Typography)<{ loading?: boolean }>`
  ${props =>
    props.loading &&
    css`
      visibility: hidden;
    `}
`;

ButtonLabel.displayName = 'ButtonLabel';
