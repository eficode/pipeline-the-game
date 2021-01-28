import styled from 'styled-components';
import {
  space,
  textAlign,
  margin,
  layout,
  flexbox,
  position,
  color,
  SpaceProps,
  LayoutProps,
  FlexboxProps,
  PositionProps,
  MarginProps,
  TextAlignProps,
  ColorProps,
} from 'styled-system';

export type BoxProps = SpaceProps &
  LayoutProps &
  FlexboxProps &
  PositionProps &
  MarginProps &
  TextAlignProps &
  ColorProps;

/**
 * Simple div wrapper that exposes flex, margin and other inline props
 */
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
  position,
  color,
);

Box.displayName = 'Box';

export default Box;
