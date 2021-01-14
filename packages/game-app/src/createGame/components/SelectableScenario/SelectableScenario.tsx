import React from 'react';
import styled from 'styled-components';

type Props = {
  title: string;
  content: string;
  selected: boolean;
  onClick: () => void;
};

const ScenarioCard = styled.div<{ selected: boolean }>(({ selected }) => ({
  minWidth: '400px',
  height: '408px',
  background: 'white',
  borderRadius: '10px',
  backdropFilter: 'blur(20px)',
  padding: selected ? '22px' : '24px',
  marginRight: '20px',
  boxSizing: 'border-box',
  border: selected ? '2px solid #00867C' : '',
}));

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

const SelectableScenario: React.FC<Props> = ({ title, content, selected, onClick }) => {
  return (
    <ScenarioCard selected={selected} onClick={onClick}>
      <ScenarioTitle>{title}</ScenarioTitle>
      <ScenarioContent>{content}</ScenarioContent>
    </ScenarioCard>
  );
};

SelectableScenario.displayName = 'SelectableScenario';

export default SelectableScenario;
