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
          padding-top: 95px;

          ${CardWrapper}:hover {
            transform: translate(0, -100px);
          }
        `
      : css`
          padding-top: 64px;
        `}
`;

DeckPanelContent.displayName = 'DeckPanelContent';

export const PanelButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 8px;
  position: absolute;
  right: 0px;
  top: 12px;
  z-index: 1;

  ${IconButton} + ${IconButton} {
    margin-left: 8px;
  }
`;

PanelButtons.displayName = 'PanelButtons';

export const AnimatedChild = styled.div`
  z-index: 2;
`;

AnimatedChild.displayName = 'AnimatedChild';
