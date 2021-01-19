import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { useSelector } from 'react-redux';
import { selectors } from '../../slice';
import ConnectedCard from '../ConnectedCard';
import { CardWrapper } from './DraggableCard.styled';

type Props = {
  id: string;
  bigger?: boolean;
};

/**
 * A card enhanced with dragging capability
 */
const DraggableCard: React.FC<Props> = ({ id, bigger }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
  });

  const position = useSelector(selectors.getCardPosition(id));

  const style =
    position?.x || position?.y
      ? {
          top: position.y,
          left: position.x,
          position: 'absolute' as const,
        }
      : {};

  return (
    <CardWrapper style={style} ref={setNodeRef} {...listeners} {...attributes} isDragging={isDragging}>
      <ConnectedCard bigger={bigger} id={id} />
    </CardWrapper>
  );
};

DraggableCard.displayName = 'DraggableCard';

export default React.memo(DraggableCard);
