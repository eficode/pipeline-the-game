import React, { useState } from 'react';
import DraggableCard from '../DraggableCard';
import styled from 'styled-components';
import { CardWrapper } from '../DraggableCard/DraggableCard';
import Box from '../../../_shared/components/Box';
import { IconButton } from '@pipeline/components';
import { ReactComponent as StackedIcon } from '@assets/icons/stacked-cards.svg';
import DroppablePanelArea from '../DroppablePanelArea';

export type PanelMode = 'stacked' | 'tow-columns';

function createStackedCss() {
  let cssString = '';
  for (let i = 0; i < 100; i++) {
    cssString += `
    ${CardWrapper}:nth-child(${i + 1}){
      position: absolute;
      top: ${110 * i}px;
      transition: transform .3s;
    }
    ${CardWrapper}:hover{
      transform: translate(0, -100px);
    }
    `;
  }
  return cssString;
}

const DeckPanelContent = styled.div<{ mode: PanelMode }>`
  flex: 1 1 auto;
  overflow-y: scroll;
  position: relative;

  ::-webkit-scrollbar {
    display: none;
  }

  ${props =>
    props.mode === 'stacked'
      ? `
    ${CardWrapper} + ${CardWrapper} {
    margin-top: 8px;
  }

  ${createStackedCss()}
  `
      : `
  
    display: grid;
    grid-template-columns: 280px 280px;
    column-gap:16px;
    row-gap:16px;
  `}
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
  const [panelMode, setPanelMode] = useState<PanelMode>('stacked');

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
        {cardsIds.map(id => (
          <DraggableCard key={id} id={id} />
        ))}
      </DeckPanelContent>
    </DroppablePanelArea>
  );
};

DeckPanel.displayName = 'Panel';

export default React.memo(DeckPanel);
