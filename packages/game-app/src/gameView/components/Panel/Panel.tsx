import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';

type Props = {};

/**
 * The right game panel, where the deck is placed at the start of the game
 * and where you can find all cards that ar not placed into the board.
 * It is also a droppable are, where you can release cards moved out from the board
 */
const Panel: React.FC<Props> = ({ children }) => {
  const { setNodeRef } = useDroppable({
    id: 'panel',
  });

  const [closed, setClosed] = useState(false);

  return (
    <div className={`panel ${closed ? 'closed' : ''}`} ref={setNodeRef}>
      <button onClick={() => setClosed(state => !state)}>toggle</button>
      {children}
    </div>
  );
};

Panel.displayName = 'Panel';

export default Panel;
