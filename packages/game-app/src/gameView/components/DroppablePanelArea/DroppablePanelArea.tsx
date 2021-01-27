import React, { useCallback, useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import styled from 'styled-components';
import { PanelMode } from '../DeckPanel/DeckPanel';
import { PANEL_ONE_COLUMNS_WIDTH, PANEL_TWO_COLUMNS_WIDTH } from '../../../dimensions';

type Props = {
  mode: PanelMode;
};

const FixedPanel = styled.div<{ closed: boolean; mode: PanelMode; isOver: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  border-radius: 40px 0px 0px 0px;
  opacity: 1;
  backdrop-filter: blur(30px);
  padding: 0px 40px 0 40px;
  box-sizing: border-box;
  background-color: rgb(170, 180, 175, 0.4);
  display: flex;
  flex-direction: column;
  transition: transform 0.5s, width 0.5s, right 0.5s;
  border: 2px solid transparent;
  ${props => props.isOver && 'border-color: #00867c;'}

  ${props =>
    props.closed
      ? `right: -${(props.mode === 'stacked' ? PANEL_ONE_COLUMNS_WIDTH : PANEL_TWO_COLUMNS_WIDTH) - 40}px;`
      : 'transform: translate(0);'} ${props =>
    props.mode === 'stacked' ? `width: ${PANEL_ONE_COLUMNS_WIDTH}px;` : `width: ${PANEL_TWO_COLUMNS_WIDTH}px;`}
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
  cursor: pointer;
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
 * and where you can find all cards that are not placed into the board.
 * It is also a droppable area, where you can release cards moved out from the board
 */
const DroppablePanelArea: React.FC<Props> = ({ children, mode }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'panel',
  });

  const [closed, setClosed] = useState(false);

  const toggle = useCallback(() => {
    setClosed(state => !state);
  }, []);

  return (
    <FixedPanel ref={setNodeRef} closed={closed} mode={mode} isOver={isOver}>
      <ToggleWrapper>
        <ToggleButton onClick={toggle}>
          <ToggleIndicator />
        </ToggleButton>
      </ToggleWrapper>
      {children}
    </FixedPanel>
  );
};

DroppablePanelArea.displayName = 'DroppablePanelArea';

export default DroppablePanelArea;
