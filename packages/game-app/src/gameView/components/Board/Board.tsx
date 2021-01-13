import React from 'react';
import { useDroppable } from '@dnd-kit/core';

type Props = {};

/**
 * Game board where the pipeline will be created placing the cards.
 * It's a droppable area so you can drag the cards in it coming from the panel
 * or moving cards inside the board directly
 */
const Board: React.FC<Props> = ({ children }) => {
  const { setNodeRef } = useDroppable({
    id: 'board',
  });

  return (
    <div className="board" ref={setNodeRef}>
      {children}
    </div>
  );
};

Board.displayName = 'Board';

export default Board;
