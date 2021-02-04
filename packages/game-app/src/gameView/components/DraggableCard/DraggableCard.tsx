import React, { useCallback, useEffect, useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors } from '../../slice';
import ConnectedCard from '../ConnectedCard';
import { CardWrapper } from './DraggableCard.styled';
import useDoubleClick from './useDoubleClick';
import { EstimationEditor, EstimationInCard } from '@pipeline/components';

type Props = {
  id: string;
  bigger?: boolean;
};

/**
 * A card enhanced with dragging capability
 */
const DraggableCard: React.FC<Props> = ({ id, bigger }) => {
  const { position, estimation, zIndex, heldBySomeoneElse } = useSelector(selectors.getCardAdditionalInfo(id));

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    disabled: heldBySomeoneElse,
    id,
  });

  const [estimationOpen, setEstimationOpen] = useState(false);

  const [animating, setAnimating] = useState(heldBySomeoneElse);

  const dispatch = useDispatch();

  const saveEstimation = useCallback(
    (estimation: string) => {
      dispatch(actions.setEstimation({ estimation, cardId: id }));
      setEstimationOpen(false);
    },
    [dispatch, id],
  );

  const isCardMoving = isDragging || heldBySomeoneElse;

  const style: React.CSSProperties =
    position?.x || position?.y
      ? {
          zIndex,
          top: position.y,
          left: position.x,
          position: 'absolute' as const,
        }
      : {};

  if (animating) {
    style.transition = 'top 0.3s ease-out, left 0.3s ease-out';
  }

  const handler = useCallback(() => {
    setEstimationOpen(true);
  }, []);

  const fire = useDoubleClick(handler);

  const dragOnPointer = listeners?.onPointerDown;

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      fire();
      dragOnPointer?.(e);
      e.stopPropagation();
      e.preventDefault();
    },
    [fire, dragOnPointer],
  );

  useEffect(() => {
    if (heldBySomeoneElse && !animating) {
      setAnimating(true);
    } else if (!heldBySomeoneElse && animating) {
      setTimeout(() => setAnimating(false), 500);
    }
  }, [heldBySomeoneElse, animating]);

  return (
    <div style={style} data-cy={`card-${id}`}>
      {estimationOpen && <EstimationEditor saveEstimation={saveEstimation} initialEstimation={estimation} />}
      {!estimationOpen && estimation && <EstimationInCard estimation={estimation} />}
      <CardWrapper
        ref={setNodeRef}
        {...listeners}
        onPointerDown={onPointerDown}
        {...attributes}
        isDragging={isCardMoving}
      >
        <ConnectedCard bigger={bigger} id={id} />
      </CardWrapper>
    </div>
  );
};

DraggableCard.displayName = 'DraggableCard';

export default React.memo(DraggableCard);
