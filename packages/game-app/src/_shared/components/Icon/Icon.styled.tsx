import styled from 'styled-components';
import { variant, color, width, height, WidthProps, HeightProps } from 'styled-system';

export const StyledIcon = styled.div<WidthProps & HeightProps & { variant?: 'default' | 'small' | 'huge' }>`
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
      huge: {
        width: '300px',
        height: '300px',
      },
    },
  })}
  ${color}
  ${width}
  ${height}
`;

StyledIcon.displayName = 'StyledIcon';
