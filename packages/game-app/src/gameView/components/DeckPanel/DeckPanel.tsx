import React from 'react';
import DraggableCard from '../DraggableCard';
import styled from 'styled-components';
import { CardWrapper } from '../DraggableCard/DraggableCard';

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

const DeckPanelContent = styled.div`
  flex: 1 1 auto;
  overflow-y: scroll;
  position: relative;

  ::-webkit-scrollbar {
    display: none;
  }

  ${CardWrapper} + ${CardWrapper} {
    margin-top: 8px;
  }

  ${createStackedCss()}
`;

type Props = {
  cardsIds: string[];
};

const DeckPanel: React.FC<Props> = ({ cardsIds }) => {
  return (
    <DeckPanelContent>
      {cardsIds.map(id => (
        <DraggableCard key={id} id={id} />
      ))}
    </DeckPanelContent>
  );
};

DeckPanel.displayName = 'Panel';

export default DeckPanel;
