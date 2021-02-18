import React, { RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  DragStartEvent,
  Modifiers,
  MouseSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { RectEntry, ViewRect } from '@dnd-kit/core/dist/types';
import { createPortal } from 'react-dom';
import { Transform } from '@dnd-kit/utilities';
import { GameEvent, GameEventType } from '../../types/gameEvents';
import { GameUIState } from '../../types/gameUIState';
import { PanelMode } from '../DeckPanel/DeckPanel';
import { DEFAULT_CARD_SIZE, PANEL_CARD_SIZE } from '../../../dimensions';
import { useZoomPanRefs } from '../ZoomPanContext';
import MovingCard from '../MovingCard';

const DEBUG_ENABLED = false;

const debugPrint = (...data: any[]) => DEBUG_ENABLED && console.debug('[CardsGameListeners]', ...data);

type Props = {
  /**
   * callback invoked when something happen inside the game.
   * For the complete list of possible events see {GameEventType}
   * @param {GameEvent} event
   */
  onEvent: (event: GameEvent) => void;
  /**
   * Current game state containing cards positions and placement (board or panel).
   */
  currentGameState: GameUIState;
  /**
   * Current panel mode
   */
  panelModeRef: RefObject<PanelMode>;
};

type TranslationDeltas = {
  [cardId: string]: {
    x: number;
    y: number;
  };
};

type AbsoluteWindowPositions = {
  [cardId: string]: {
    x: number;
    y: number;
  };
};

let collisionTime = 0;
let moveTime = 0;
let modifiersTime = 0;
let movementStart = 0;

// hack for performance test selenium is not able to work with distance activation
// if window.isPerfTestRunning use the perfTestConstraints for drag activation
const standardConstraints = { activationConstraint: { distance: 5 } };
const perfTestConstraints = { activationConstraint: { delay: 5, tolerance: 0 } };

/**
 *  Component to listen on cards moving.
 *
 *  It handles final position calculation on card move considering board scale
 *  and pan amount passed as props.
 *  Fires event with the final information when they happen.
 *
 *  Wrap panel and game with this
 */
const CardsGameListeners: React.FC<Props> = ({ onEvent, children, currentGameState, panelModeRef }) => {
  const gameStateRef = useRef<GameUIState>(currentGameState);
  const translationDeltaRef = useRef<TranslationDeltas>({});
  const absoluteItemPositionWithResectToWindowRef = useRef<AbsoluteWindowPositions>({});
  const { panRef: panAmountRef, scaleRef: boardScaleRef } = useZoomPanRefs();

  useEffect(() => {
    gameStateRef.current = currentGameState;
  }, [currentGameState]);

  const [draggingCard, setDraggingCard] = useState<{ id: string; parent: 'panel' | 'board' } | null>(null);

  const handleDragStart = useCallback(
    (ev: DragStartEvent) => {
      movementStart = performance.now();

      const { active } = ev;
      const parent = gameStateRef.current[active.id].placedIn;
      setDraggingCard({ id: active.id, parent });
      onEvent({
        type: GameEventType.CardMovingStart,
        cardId: active.id,
        parent,
      });
    },
    [onEvent],
  );

  const handleDragMove = useCallback((ev: DragMoveEvent) => {
    const start = performance.now();

    const {
      active: { id: cardId },
      delta,
      draggingRect,
    } = ev;
    const parent = gameStateRef.current[cardId].placedIn;
    if (parent === 'board') {
      translationDeltaRef.current = {
        ...translationDeltaRef.current,
        [cardId]: {
          ...delta,
        },
      };
    } else {
      absoluteItemPositionWithResectToWindowRef.current = {
        ...absoluteItemPositionWithResectToWindowRef.current,
        [cardId]: {
          y: draggingRect.top,
          x: draggingRect.left,
        },
      };
    }
    const end = performance.now();
    moveTime += end - start;
  }, []);

  const handleDragEnd = useCallback(
    (ev: DragEndEvent) => {
      const {
        over,
        delta,
        active: { id: cardId },
      } = ev;
      const newParent = over?.id;
      setDraggingCard(null);

      if (delta?.x === 0 && delta.y === 0) {
        return;
      }

      if (newParent === 'panel') {
        onEvent({
          cardId,
          target: 'panel',
          type: GameEventType.CardMovingEnd,
        });
        if (translationDeltaRef.current[cardId]) {
          translationDeltaRef.current[cardId].x = 0;
          translationDeltaRef.current[cardId].y = 0;
        }
        return;
      }
      const parent = gameStateRef.current[cardId].placedIn;

      let newPosition: { x: number; y: number };
      if (parent === 'board') {
        const currentPosition = gameStateRef.current[cardId].position!;
        newPosition = {
          x: currentPosition.x + delta.x / boardScaleRef.current,
          y: currentPosition.y + delta.y / boardScaleRef.current,
        };
      } else {
        const centerAdjustmentX = (PANEL_CARD_SIZE.width - DEFAULT_CARD_SIZE.width * boardScaleRef.current) / 2;
        const centerAdjustmentY = (PANEL_CARD_SIZE.height - DEFAULT_CARD_SIZE.height * boardScaleRef.current) / 2;

        let absoluteWindowPosition = absoluteItemPositionWithResectToWindowRef.current[cardId];

        /*
         * dnd kit does not consider translation on calculating absolute position so we need to subtract the
         * translation given by the card animation on hover
         */
        if (panelModeRef.current === 'stacked') {
          absoluteWindowPosition = {
            ...absoluteWindowPosition,
            y: absoluteWindowPosition.y - 100,
          };
        }

        // rescale window position considering panning and scale
        newPosition = {
          x: (absoluteWindowPosition.x - panAmountRef.current.x + centerAdjustmentX) / boardScaleRef.current,
          y: (absoluteWindowPosition.y - panAmountRef.current.y + centerAdjustmentY) / boardScaleRef.current,
        };
      }
      if (translationDeltaRef.current[cardId]) {
        translationDeltaRef.current[cardId].x = 0;
        translationDeltaRef.current[cardId].y = 0;
      }

      const movementEnd = performance.now();

      debugPrint('collision time', collisionTime.toFixed(2));
      debugPrint('moving time', moveTime.toFixed(2));
      debugPrint('modifiers time', modifiersTime.toFixed(2));
      debugPrint('total movement time', (movementEnd - movementStart).toFixed(2));

      collisionTime = 0;
      moveTime = 0;
      modifiersTime = 0;
      movementStart = 0;
      onEvent({
        cardId,
        target: 'board',
        type: GameEventType.CardMovingEnd,
        position: newPosition,
      });
    },
    [boardScaleRef, onEvent, panAmountRef, panelModeRef],
  );

  const modifiers = useMemo(
    () =>
      [
        args => {
          const start = performance.now();

          if (!draggingCard?.id) {
            return {
              scaleY: 1,
              scaleX: 1,
              x: args.transform.x,
              y: args.transform.y,
            };
          }
          const currentMovingCardState = gameStateRef.current[draggingCard!.id];
          let newTransform: Transform;
          if (currentMovingCardState.placedIn === 'board') {
            /**
             * when the item is in the board and you start dragging it the overlay is set to a position
             * relative to the window (fixed) with the same top and left position of the item in the board,
             * this is not correct, this modifier adjust translation amount to compensate this error
             * taking into account panning, scaling and actual initial item position in the board with coordinates
             * related to board origin
             */

            newTransform = {
              scaleY: boardScaleRef.current,
              scaleX: boardScaleRef.current,
              x:
                args.transform.x +
                (currentMovingCardState.position?.x || 0) * (boardScaleRef.current - 1) +
                panAmountRef.current.x,
              y:
                args.transform.y +
                (currentMovingCardState.position?.y || 0) * (boardScaleRef.current - 1) +
                panAmountRef.current.y,
            };
          } else {
            let y = args.transform.y;
            /*
             * dnd kit does not consider translation on calculating absolute position so we need to subtract the
             * translation given by the card animation on hover
             */
            if (panelModeRef.current === 'stacked') {
              y = y - 100;
            }
            newTransform = {
              scaleY: 1,
              scaleX: 1,
              x: args.transform.x,
              y: y,
            };
          }
          const end = performance.now();
          modifiersTime += end - start;
          return newTransform;
        },
      ] as Modifiers,
    [boardScaleRef, draggingCard, panAmountRef, panelModeRef],
  );

  const customCollisionDetectionStrategy = useCallback(
    (rects: RectEntry[], draggingRect: ViewRect) => {
      const start = performance.now();
      if (!draggingCard) {
        return null;
      }
      const panelRect = rects.filter(([id]) => id === 'panel');
      const currentMovingCardState = gameStateRef.current[draggingCard!.id];

      let absoluteRectWithRespectToWindow = draggingRect;
      if (currentMovingCardState.placedIn === 'board') {
        debugPrint('board scale', boardScaleRef.current);

        const absoluteRectWithRespectToBoard = {
          left:
            currentMovingCardState.position!.x +
            (translationDeltaRef.current[draggingCard!.id]?.x || 0) / boardScaleRef.current,
          top:
            currentMovingCardState.position!.y +
            (translationDeltaRef.current[draggingCard!.id]?.y || 0) / boardScaleRef.current,
          height: draggingRect.height,
          width: draggingRect.width,
          right: draggingRect.right,
          bottom: draggingRect.bottom,
        };

        debugPrint(
          'absoluteRectWithRespectToBoard rect',
          absoluteRectWithRespectToBoard.left,
          absoluteRectWithRespectToBoard.top,
        );
        debugPrint('panning position', panAmountRef.current.x, panAmountRef.current.y);
        // TODO right and bottom
        absoluteRectWithRespectToWindow = {
          bottom: absoluteRectWithRespectToBoard.bottom,
          height: absoluteRectWithRespectToBoard.height * boardScaleRef.current,
          left:
            (absoluteRectWithRespectToBoard.left + panAmountRef.current.x / boardScaleRef.current) *
            boardScaleRef.current,
          offsetLeft:
            (absoluteRectWithRespectToBoard.left + panAmountRef.current.x / boardScaleRef.current) *
            boardScaleRef.current,
          offsetTop:
            (absoluteRectWithRespectToBoard.top + panAmountRef.current.y / boardScaleRef.current) *
            boardScaleRef.current,
          right: absoluteRectWithRespectToBoard.right,
          top:
            (absoluteRectWithRespectToBoard.top + panAmountRef.current.y / boardScaleRef.current) *
            boardScaleRef.current,
          width: absoluteRectWithRespectToBoard.width * boardScaleRef.current,
        };
        debugPrint(
          'adjusted rect',
          absoluteRectWithRespectToWindow.width,
          absoluteRectWithRespectToWindow.left,
          absoluteRectWithRespectToWindow.top,
          panelRect[0][1],
        );
      }

      const intersectingPanelRect =
        panelRect?.[0] &&
        absoluteRectWithRespectToWindow.left + absoluteRectWithRespectToWindow.width >= panelRect[0][1].offsetLeft
          ? 'panel'
          : null;

      debugPrint('customCollisionDetectionStrategy', rects, absoluteRectWithRespectToWindow);
      debugPrint('intersectingPanelRect', intersectingPanelRect, panelRect);
      const end = performance.now();
      collisionTime += end - start;
      if (intersectingPanelRect) {
        return intersectingPanelRect;
      } else {
        return 'board';
      }
    },
    [boardScaleRef, draggingCard, panAmountRef],
  );
  // todo use delay and tolerance for test and distance for real usage
  const mouseSensor = useSensor(MouseSensor, window.isPerfTestRunning ? perfTestConstraints : standardConstraints);
  const touchSensor = useSensor(PointerSensor, window.isPerfTestRunning ? perfTestConstraints : standardConstraints);
  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragMove={handleDragMove}
      collisionDetection={customCollisionDetectionStrategy}
    >
      {children}
      {createPortal(
        <DragOverlay adjustScale dropAnimation={null} modifiers={modifiers} className="transform-0">
          {draggingCard ? <MovingCard bigger={draggingCard.parent === 'panel'} id={draggingCard.id} /> : null}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  );
};

CardsGameListeners.displayName = 'CardsGameListeners';

export default CardsGameListeners;
