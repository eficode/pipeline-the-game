import styled from 'styled-components';
import {
  space,
  textAlign,
  margin,
  layout,
  flexbox,
  SpaceProps,
  LayoutProps,
  FlexboxProps,
  PositionProps,
  MarginProps,
  TextAlignProps,
} from 'styled-system';

export type BoxProps = SpaceProps & LayoutProps & FlexboxProps & PositionProps & MarginProps & TextAlignProps;

const Box = styled.div<BoxProps>(
  {
    boxSizing: 'border-box',
    minWidth: 0,
  },
  space,
  layout,
  flexbox,
  margin,
  textAlign,
);

export default Box;
