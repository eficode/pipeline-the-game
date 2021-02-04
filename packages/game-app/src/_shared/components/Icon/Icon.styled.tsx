import styled from 'styled-components';
import { variant } from 'styled-system';

export const StyledIcon = styled.div<{ variant?: 'default' | 'small' }>`
  width: 24px;
  height: 24px;

  & svg {
    height: 100%;
    width: 100%;
  }

  ${variant({
    variants: {
      default: {},
      small: {
        width: '16px',
        height: '16px',
      },
    },
  })}
`;

StyledIcon.displayName = 'StyledIcon';
