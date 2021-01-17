import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import styled from 'styled-components';
import Box from '../../../_shared/components/Box';

type Props = {};

const FixedPanel = styled.div<{ closed: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 360px;
  height: 100vh;
  border-radius: 40px 0px 0px 0px;
  opacity: 1;
  backdrop-filter: blur(30px);
  padding: 40px 40px 0 40px;
  box-sizing: border-box;
  background-color: rgb(170, 180, 175, 0.4);
  display: flex;
  flex-direction: column;
  transition: transform 0.5s;

  ${props => props.closed && 'transform: translate(300px)'}
`;

const ToggleWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ToggleButton = styled.button`
  min-width: 20px;
  height: 40px;
  padding: 0;
  margin: 0;
  background: transparent;
  border: none;
  border-radius: 9px;
`;

const ToggleIndicator = styled.div`
  width: 3px;
  height: 100%;
  padding: 0;
  margin: 0;
  background: #b4aea9;
  border: none;
  border-radius: 9px;
  position: relative;
  left: 8px;
`;

/**
 * The right game panel, where the deck is placed at the start of the game
 * and where you can find all cards that ar not placed into the board.
 * It is also a droppable are, where you can release cards moved out from the board
 */
const DroppablePanelArea: React.FC<Props> = ({ children }) => {
  const { setNodeRef } = useDroppable({
    id: 'panel',
  });

  const [closed, setClosed] = useState(false);

  return (
    <FixedPanel ref={setNodeRef} closed={closed}>
      <ToggleWrapper>
        <ToggleButton onClick={() => setClosed(state => !state)}>
          <ToggleIndicator />
        </ToggleButton>
      </ToggleWrapper>
      {children}
    </FixedPanel>
  );
};

DroppablePanelArea.displayName = 'DroppablePanelArea';

export default DroppablePanelArea;
