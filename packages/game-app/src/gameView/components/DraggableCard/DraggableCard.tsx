import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { useSelector } from 'react-redux';
import { selectors } from '../../slice';
import { Card } from '@pipeline/components';

type Props = {
  id: string;
};

/**
 * A card enhanced with dragging capability
 */
const DraggableCard: React.FC<Props> = ({ id }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
  });

  const position = useSelector(selectors.getCardPosition(id));
  const cardData = useSelector(selectors.getCardById(id))!;

  const style =
    position?.x || position?.y
      ? {
          top: position.y,
          left: position.x,
          position: 'absolute' as const,
        }
      : {};

  return (
    <div style={style} ref={setNodeRef} {...listeners} {...attributes} className={`${isDragging ? 'dragging' : ''}`}>
      <Card {...cardData} />
    </div>
  );
};

DraggableCard.displayName = 'DraggableCard';

export default DraggableCard;
