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
  overflow-y: hidden;
  height: 433px;

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
      {cards.map((value, index) => (
        <SelectableScenario
          title={value.title}
          content={value.content}
          onClick={callbacks[index]}
          selected={selectedScenario === value.id}
        />
      ))}
    </Wrapper>
  );
};

ScenariosList.displayName = 'ScenariosList';

export default ScenariosList;
