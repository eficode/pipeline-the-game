import styled from 'styled-components';
import { flex, FlexProps, FlexboxProps, flexbox, LayoutProps, layout } from 'styled-system';

export const TowColumnsContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: row;
`;

TowColumnsContainer.displayName = 'TwoColumnsContainer';

export const Column = styled.div<FlexProps & FlexboxProps & LayoutProps>`
  ${flex}
  ${flexbox}
  ${layout}
`;

Column.displayName = 'Column';

export const LeftColumn = styled(Column)`
  padding: 40px 8%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #eeeeee;
  box-sizing: border-box;
  max-width: 45%;
  flex: 0.45 0.45 auto;
`;

LeftColumn.displayName = 'LeftColumn';

export const Logo = styled.div`
  width: 100px;
  position: absolute;
  top: 8px;
  left: 8%;

  svg {
    max-width: 100%;
  }
`;

Logo.displayName = 'Logo';
