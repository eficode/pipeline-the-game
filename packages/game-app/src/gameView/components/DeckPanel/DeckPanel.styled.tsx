import styled, { css } from 'styled-components';
import { IconButton } from '@pipeline/components';
import { CardWrapper } from '../DraggableCard/DraggableCard.styled';

export type PanelMode = 'stacked' | 'tow-columns';

export const DeckPanelContent = styled.div<{ mode: PanelMode }>`
  flex: 1 1 auto;
  overflow-y: scroll;
  position: relative;
  transition: padding 0.5s;

  ::-webkit-scrollbar {
    display: none;
  }

  ${props =>
    props.mode === 'stacked'
      ? css`
          padding-top: 186px;

          ${CardWrapper}:hover {
            transform: translate(0, -100px);
          }
        `
      : css`
          padding-top: 136px;
        `}
`;

DeckPanelContent.displayName = 'DeckPanelContent';

export const PanelButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 8px;

  ${IconButton} + ${IconButton} {
    margin-left: 8px;
  }
`;

PanelButtons.displayName = 'PanelButtons';

export const PanelTools = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  position: absolute;
  right: 40px;
  top: 40px;
  left: 40px;
  z-index: 1;
`;

PanelTools.displayName = 'PanelTools';

export const AnimatedChild = styled.div`
  z-index: 2;
`;

AnimatedChild.displayName = 'AnimatedChild';
