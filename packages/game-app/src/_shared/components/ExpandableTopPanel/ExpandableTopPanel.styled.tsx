import styled, { css } from 'styled-components';

export const PanelHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 40px;
  position: relative;
`;

export const PanelWrapper = styled.div`
  width: 400px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  backdrop-filter: blur(20px);
  cursor: pointer;
`;

export const PanelContentWrapper = styled.div<{ collapsed: boolean }>`
  transition: all 0.5s ease-out;
  box-sizing: border-box;
  overflow: hidden;
  ${({ collapsed }) =>
    collapsed
      ? css`
          max-height: 0 !important;
        `
      : css`
          max-height: 500px;
          transition: max-height 0.5s ease-in;
        `}
`;

export const PanelContent = styled.div<{ collapsed: boolean }>`
  padding: 14px 24px 24px 24px;
`;

export const ExpandIcon = styled.div<{ collapsed: boolean }>`
  position: absolute;
  right: 24px;
  transition: transform 0.3s ease-in;

  ${({ collapsed }) =>
    !collapsed &&
    css`
      transform: rotate(180deg);
    `}
`;
