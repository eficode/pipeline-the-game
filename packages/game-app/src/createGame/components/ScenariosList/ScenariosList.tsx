import React, { useMemo } from 'react';
import { CardEntity } from '@pipeline/common';
import styled from 'styled-components';
import SelectableScenario from '../SelectableScenario';

type Props = {
  cards: CardEntity[];
  onScenarioSelected: (id: string) => void;
  selectedScenario: string | null;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px;
  overflow-x: scroll;
  height: 390px;
  padding-top: 20px;

  ::-webkit-scrollbar {
    height: 6px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #000000;
    border-radius: 5px;
  }
`;

const ScenariosList: React.FC<Props> = ({ cards, onScenarioSelected, selectedScenario }) => {
  const callbacks = useMemo(() => {
    return cards.map(v => () => onScenarioSelected(v.id));
  }, [cards, onScenarioSelected]);

  return (
    <Wrapper>
      {cards.map((card, index) => (
        <SelectableScenario
          key={card.id}
          id={card.id}
          title={card.title}
          content={card.content}
          onClick={callbacks[index]}
          selected={selectedScenario === card.id}
        />
      ))}
    </Wrapper>
  );
};

ScenariosList.displayName = 'ScenariosList';

export default ScenariosList;
