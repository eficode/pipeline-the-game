import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { BoardContainer } from './Board.styled';

type Props = {
  scale: number;
};

/**
 * Game board where the pipeline will be created placing the cards.
 * It's a droppable area so you can drag the cards in it coming from the panel
 * or moving cards inside the board directly
 */
const Board: React.FC<Props> = ({ children, scale }) => {
  const { setNodeRef } = useDroppable({
    id: 'board',
  });

  return (
    <BoardContainer scale={scale} ref={setNodeRef}>
      {children}
    </BoardContainer>
  );
};

Board.displayName = 'Board';

export default Board;
