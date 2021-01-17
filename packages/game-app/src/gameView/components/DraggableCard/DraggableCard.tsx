import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { useSelector } from 'react-redux';
import { selectors } from '../../slice';
import { Card } from '@pipeline/components';
import styled from 'styled-components';
import ConnectedCard from '../ConnectedCard';

type Props = {
  id: string;
};

export const CardWrapper = styled.div`
  cursor: pointer;
  transition: all 0.3s ease-out;
`;

/**
 * A card enhanced with dragging capability
 */
const DraggableCard: React.FC<Props> = ({ id }) => {
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
    <CardWrapper
      style={style}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`${isDragging ? 'dragging' : ''}`}
    >
      <ConnectedCard id={id} />
    </CardWrapper>
  );
};

DraggableCard.displayName = 'DraggableCard';

export default DraggableCard;
