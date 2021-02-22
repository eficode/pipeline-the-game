import React from 'react';
import styled from 'styled-components';

type Props = {
  id: string;
  title: string;
  content: string;
  selected: boolean;
  onClick: () => void;
};

const ScenarioCard = styled.div<{ selected: boolean }>`
  min-width: 400px;
  height: 360px;
  background: white;
  border-radius: 10px;
  backdrop-filter: blur(20px);
  padding: ${({ selected }) => (selected ? '18px' : '20px')};
  margin-right: 15px;
  margin-left: 15px;
  box-sizing: border-box;
  border: ${({ selected }) => (selected ? '2px solid #00867C' : '')};
  transition: transform 0.5s;

  &:hover {
    transform: translate(0, -20px);
  }
  &:first-child {
    margin-left: 30px;
  }
  &:last-child {
    margin-right: 30px;
  }
`;
const ScenarioTitle = styled.h5({
  fontSize: '20px',
  fontWeight: 'bold',
  fontFamily: 'Montserrat',
  letterSpacing: '0px',
  color: '#101820',
  marginBottom: '15px',
});

const ScenarioContent = styled.div({
  fontSize: '14px',
  letterSpacing: '0px',
  color: '#101820',
  whiteSpace: 'pre-line',
  lineHeight: '22px',
});

const SelectableScenario: React.FC<Props> = ({ id, title, content, selected, onClick }) => {
  return (
    <ScenarioCard id={`scenario-${id}`} selected={selected} onClick={onClick}>
      <ScenarioTitle>{title}</ScenarioTitle>
      <ScenarioContent>{content}</ScenarioContent>
    </ScenarioCard>
  );
};

SelectableScenario.displayName = 'SelectableScenario';

export default SelectableScenario;
