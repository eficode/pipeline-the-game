import React, { useEffect, useState } from 'react';
import DraggableCard from '../DraggableCard';
import styled, { css } from 'styled-components';
import { IconButton, AnimatedGrid } from '@pipeline/components';
import { ReactComponent as StackedIcon } from '@assets/icons/stacked-cards.svg';
import { ReactComponent as TwoColumnsIcon } from '@assets/icons/2column-view.svg';
import DroppablePanelArea from '../DroppablePanelArea';
import { PANEL_CARD_SIZE, PANEL_ONE_COLUMNS_WIDTH, PANEL_TWO_COLUMNS_WIDTH } from '../../../dimensions';
import { CardWrapper } from '../DraggableCard/DraggableCard';

export type PanelMode = 'stacked' | 'tow-columns';

const DeckPanelContent = styled.div<{ mode: PanelMode }>`
  flex: 1 1 auto;
  overflow-y: scroll;
  position: relative;

  ::-webkit-scrollbar {
    display: none;
  }

  ${props =>
    props.mode === 'stacked'
      ? css`
          ${CardWrapper}:hover {
            transform: translate(0, -100px);
          }
        `
      : ''}
`;

const PanelButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 8px;

  ${IconButton} + ${IconButton} {
    margin-left: 8px;
  }
`;

type Props = {
  cardsIds: string[];
  panelModeRef: React.MutableRefObject<PanelMode>;
};

const DeckPanel: React.FC<Props> = ({ cardsIds, panelModeRef }) => {
  const [panelMode, setPanelMode] = useState<PanelMode>('stacked');

  useEffect(() => {
    panelModeRef.current = panelMode;
  }, [panelMode, panelModeRef]);

  return (
    <DroppablePanelArea mode={panelMode}>
      <PanelButtons>
        <IconButton active={panelMode === 'stacked'} onClick={() => setPanelMode('stacked')}>
          <StackedIcon />
        </IconButton>
        <IconButton active={panelMode === 'tow-columns'} onClick={() => setPanelMode('tow-columns')}>
          <TwoColumnsIcon />
        </IconButton>
      </PanelButtons>
      <DeckPanelContent mode={panelMode}>
        <AnimatedGrid
          itemWidth={PANEL_CARD_SIZE.width}
          itemHeight={PANEL_CARD_SIZE.height}
          margin={16}
          marginVertical={panelMode === 'tow-columns' ? 16 : -90}
          containerWidth={panelMode === 'tow-columns' ? PANEL_TWO_COLUMNS_WIDTH - 80 : PANEL_ONE_COLUMNS_WIDTH - 80}
          transitionTime="400ms"
          transitionTimingFunction="ease-in-out"
        >
          {cardsIds.map(id => (
            <DraggableCard bigger key={id} id={id} />
          ))}
        </AnimatedGrid>
      </DeckPanelContent>
    </DroppablePanelArea>
  );
};

DeckPanel.displayName = 'Panel';

export default React.memo(DeckPanel);
