import styled from 'styled-components';

export const Banner = styled.div`
  position: absolute;
  z-index: 1000;
  left: 50px;
  right: 50px;
  bottom: 16px;
  height: 50px;
  background: #d7d2cb;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

Banner.displayName = 'Banner';

export const CloseIconWrapper = styled.div`
  position: absolute;
  right: 4px;
  top: 4px;
`;

CloseIconWrapper.displayName = 'CloseIconWrapper';
