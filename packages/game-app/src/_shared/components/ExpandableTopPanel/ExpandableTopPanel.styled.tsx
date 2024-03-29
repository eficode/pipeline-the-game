import styled, { css } from 'styled-components';

export const PanelHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 40px;
  position: relative;
`;

PanelHeader.displayName = 'PanelHeader';

export const PanelWrapper = styled.div<{ disabled?: boolean }>`
  width: 400px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 4px;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};

  @supports (backdrop-filter: blur(20px)) {
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(20px);
  }
`;

PanelWrapper.displayName = 'PanelWrapper';

export const PanelContentWrapper = styled.div<{ collapsed: boolean }>`
  transition: all 0.5s ease-out;
  box-sizing: border-box;
  overflow: hidden;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    padding-left: 15px;
  }
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

PanelContentWrapper.displayName = 'PanelContentWrapper';

export const PanelContent = styled.div<{ collapsed: boolean }>`
  padding: 14px 24px 24px 24px;
`;

PanelContent.displayName = 'PanelContent';

export const ExpandIcon = styled.div<{ collapsed: boolean }>`
  position: absolute;
  right: 24px;
  transition: transform 0.3s ease-in;

  svg {
    width: 16px;
    height: 16px;
  }

  ${({ collapsed }) =>
    !collapsed &&
    css`
      transform: rotate(180deg);
    `}
`;

ExpandIcon.displayName = 'ExpandIcon';
