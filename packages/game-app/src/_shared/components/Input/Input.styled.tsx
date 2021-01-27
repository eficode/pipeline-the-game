import styled, { css } from 'styled-components';
import { color, ColorProps, variant } from 'styled-system';
import Icon from '../Icon';

export type InputVariants = 'default' | 'clear';

export const StyledInput = styled.input<{ variant: InputVariants; withIcon?: boolean } & ColorProps>`
  width: 100%;
  height: 40px;
  padding: 5px 10px;
  box-sizing: border-box;
  border-radius: 10px;

  &:focus {
    outline: none;
  }

  &:focus {
    border: 1px solid ${props => props.theme.colors.activeAccent};
  }

  ${({ withIcon }) =>
    withIcon
      ? css`
          padding-left: 48px;
        `
      : css``}

  ${({ theme }) =>
    variant({
      variants: {
        default: theme.input.variants.default,
        clear: theme.input.variants.clear,
      },
    })} ${color}
`;

StyledInput.displayName = 'StyledInput';

export const InputIcon = styled(Icon)`
  position: absolute;
  top: 8px;
  color: #9a9a9a;

  ${StyledInput}:focus + & {
    color: ${props => props.theme.colors.activeAccent};
  }
`;

InputIcon.displayName = 'InputIcon';

export const LeftInputIcon = styled(InputIcon)`
  left: 16px;
`;

LeftInputIcon.displayName = 'LeftInputIcon';
