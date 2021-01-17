import React, { useState } from 'react';
import DraggableCard from '../DraggableCard';
import styled from 'styled-components';
import { IconButton, AnimatedGrid } from '@pipeline/components';
import { ReactComponent as StackedIcon } from '@assets/icons/stacked-cards.svg';
import DroppablePanelArea from '../DroppablePanelArea';

export type PanelMode = 'stacked' | 'tow-columns';

const DeckPanelContent = styled.div<{ mode: PanelMode }>`
  flex: 1 1 auto;
  overflow-y: scroll;
  position: relative;

  ::-webkit-scrollbar {
    display: none;
  }
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
};

const DeckPanel: React.FC<Props> = ({ cardsIds }) => {
  const [panelMode, setPanelMode] = useState<PanelMode>('tow-columns');

  return (
    <DroppablePanelArea mode={panelMode}>
      <PanelButtons>
        <IconButton active={panelMode === 'stacked'} onClick={() => setPanelMode('stacked')}>
          <StackedIcon />
        </IconButton>
        <IconButton active={panelMode === 'tow-columns'} onClick={() => setPanelMode('tow-columns')}>
          <StackedIcon />
        </IconButton>
      </PanelButtons>
      <DeckPanelContent mode={panelMode}>
        <AnimatedGrid
          itemWidth={280}
          itemHeight={200}
          margin={16}
          marginVertical={panelMode === 'tow-columns' ? 16 : -90}
          containerWidth={panelMode === 'tow-columns' ? 576 : 360}
          transitionTime={'400ms'}
          transitionTimingFunction={'ease-in-out'}
        >
          {cardsIds.map(id => (
            <DraggableCard key={id} id={id} />
          ))}
        </AnimatedGrid>
      </DeckPanelContent>
    </DroppablePanelArea>
  );
};

DeckPanel.displayName = 'Panel';

export default React.memo(DeckPanel);
