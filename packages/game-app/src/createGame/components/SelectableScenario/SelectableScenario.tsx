import { Button, Dialog } from '@pipeline/components';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useWindowDimensions } from '../../../_shared/components/utils';
import { ReactComponent as BackArrow } from '@assets/icons/back-arrow-default.svg';
import { ReactComponent as Arrow } from '@assets/icons/arrow.svg';

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
  @media (max-width: ${({ theme }) => theme.mobile}) {
    min-width: 180px;
    max-width: 180px;
    height: 180px;
    margin-top: 20px;
  }

  &:hover {
    transform: translate(0, -20px);
  }
  &:first-child {
    margin-left: 30px;
    @media (max-width: ${({ theme }) => theme.mobile}) {
      margin-left: 15px;
    }
  }
  &:last-child {
    margin-right: 30px;
    @media (max-width: ${({ theme }) => theme.mobile}) {
      margin-right: 15px;
    }
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

const ScenarioContent = styled.div`
  font-size: 14px;
  letter-spacing: 0;
  color: #101820;
  white-space: pre-line;
  line-height: 22px;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;
const SelectableScenario: React.FC<Props> = ({ id, title, content, selected, onClick }) => {
  const { width } = useWindowDimensions();
  const isWindowTooSmall = width < 1100;
  const [open, setOpen] = useState(false);

  if (isWindowTooSmall) {
    return (
      <ScenarioCard selected={selected} onClick={onClick}>
        <ScenarioTitle>{title}</ScenarioTitle>
        <Dialog open={open} title={title}>
          <ScenarioContent>{content}</ScenarioContent>
          <Button leftIcon={<BackArrow />} label="Back to scenarios" onClick={() => setOpen(false)} id="close-dialog" />
        </Dialog>
        <Button
          variant="secondary"
          label="Details"
          onClick={() => setOpen(true)}
          id="open-dialog"
          rightIcon={<Arrow />}
        />
      </ScenarioCard>
    );
  }

  return (
    <ScenarioCard id={`scenario-${id}`} selected={selected} onClick={onClick}>
      <ScenarioTitle>{title}</ScenarioTitle>
      <ScenarioContent>{content}</ScenarioContent>
    </ScenarioCard>
  );
};

SelectableScenario.displayName = 'SelectableScenario';

export default SelectableScenario;
