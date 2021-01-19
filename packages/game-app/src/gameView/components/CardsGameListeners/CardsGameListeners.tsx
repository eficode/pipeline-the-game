import React, { RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DndContext, DragEndEvent, DragMoveEvent, DragOverlay, DragStartEvent, Modifiers } from '@dnd-kit/core';
import { RectEntry, ViewRect } from '@dnd-kit/core/dist/types';
import { createPortal } from 'react-dom';
import { Transform } from '@dnd-kit/utilities';
import { GameEvent, GameEventType } from '../../types/gameEvents';
import { GameUIState } from '../../types/gameUIState';
import ConnectedCard from '../ConnectedCard';
import { PanelMode } from '../DeckPanel/DeckPanel';
import { DEFAULT_CARD_SIZE, PANEL_CARD_SIZE } from '../../../dimensions';

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
   * Current game board scale (used for target coordinates calculation).
   */
  boardScale: number;
  /**
   * Current panel mode
   */
  panelModeRef: RefObject<PanelMode>;
  /**
   * Current game board panning amount (used for target coordinates calculation).
   */
  panAmount: {
    x: number;
    y: number;
  };
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

/**
 *  Component to listen on cards moving.
 *
 *  It handles final position calculation on card move considering board scale
 *  and pan amount passed as props.
 *  Fires event with the final information when they happen.
 *
 *  Wrap panel and game with this
 */
const CardsGameListeners: React.FC<Props> = ({
  onEvent,
  children,
  currentGameState,
  boardScale,
  panAmount,
  panelModeRef,
}) => {
  const gameStateRef = useRef<GameUIState>(currentGameState);
  const translationDeltaRef = useRef<TranslationDeltas>({});
  const absoluteItemPositionWithResectToWindowRef = useRef<AbsoluteWindowPositions>({});
  const panScaleRef = useRef(boardScale);
  const panPositionRef = useRef(panAmount);

  useEffect(() => {
    gameStateRef.current = currentGameState;
  }, [currentGameState]);

  useEffect(() => {
    panScaleRef.current = boardScale;
  }, [boardScale]);

  useEffect(() => {
    panPositionRef.current = panAmount;
  }, [panAmount]);

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

      if (newParent === 'panel') {
        onEvent({
          cardId,
          target: 'panel',
          type: GameEventType.CardMovingEnd,
        });
        return;
      }
      const parent = gameStateRef.current[cardId].placedIn;

      let newPosition: { x: number; y: number };
      if (parent === 'board') {
        const currentPosition = gameStateRef.current[cardId].position!;
        newPosition = {
          x: currentPosition.x + delta.x / panScaleRef.current,
          y: currentPosition.y + delta.y / panScaleRef.current,
        };
      } else {
        const centerAdjustmentX = (PANEL_CARD_SIZE.width - DEFAULT_CARD_SIZE.width * panScaleRef.current) / 2;
        const centerAdjustmentY = (PANEL_CARD_SIZE.height - DEFAULT_CARD_SIZE.height * panScaleRef.current) / 2;

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
          x: (absoluteWindowPosition.x - panPositionRef.current.x + centerAdjustmentX) / panScaleRef.current,
          y: (absoluteWindowPosition.y - panPositionRef.current.y + centerAdjustmentY) / panScaleRef.current,
        };
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
    [onEvent, panelModeRef],
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
              scaleY: panScaleRef.current,
              scaleX: panScaleRef.current,
              x:
                args.transform.x +
                (currentMovingCardState.position?.x || 0) * (panScaleRef.current - 1) +
                panPositionRef.current.x,
              y:
                args.transform.y +
                (currentMovingCardState.position?.y || 0) * (panScaleRef.current - 1) +
                panPositionRef.current.y,
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
    [draggingCard, panelModeRef],
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
        debugPrint('board scale', panScaleRef.current);

        const absoluteRectWithRespectToBoard = {
          left:
            currentMovingCardState.position!.x +
            (translationDeltaRef.current[draggingCard!.id]?.x || 0) / panScaleRef.current,
          top:
            currentMovingCardState.position!.y +
            (translationDeltaRef.current[draggingCard!.id]?.y || 0) / panScaleRef.current,
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
        debugPrint('panning position', panPositionRef.current.x, panPositionRef.current.y);
        // TODO right and bottom
        absoluteRectWithRespectToWindow = {
          bottom: absoluteRectWithRespectToBoard.bottom,
          height: absoluteRectWithRespectToBoard.height * panScaleRef.current,
          left:
            (absoluteRectWithRespectToBoard.left + panPositionRef.current.x / panScaleRef.current) *
            panScaleRef.current,
          offsetLeft:
            (absoluteRectWithRespectToBoard.left + panPositionRef.current.x / panScaleRef.current) *
            panScaleRef.current,
          offsetTop:
            (absoluteRectWithRespectToBoard.top + panPositionRef.current.y / panScaleRef.current) * panScaleRef.current,
          right: absoluteRectWithRespectToBoard.right,
          top:
            (absoluteRectWithRespectToBoard.top + panPositionRef.current.y / panScaleRef.current) * panScaleRef.current,
          width: absoluteRectWithRespectToBoard.width * panScaleRef.current,
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
    [draggingCard],
  );

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragMove={handleDragMove}
      collisionDetection={customCollisionDetectionStrategy}
    >
      {children}
      {createPortal(
        <DragOverlay adjustScale dropAnimation={null} modifiers={modifiers} className="transform-0">
          {draggingCard ? (
            <ConnectedCard bigger={draggingCard.parent === 'panel'} dragging={true} id={draggingCard.id} />
          ) : null}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  );
};

CardsGameListeners.displayName = 'CardsGameListeners';

export default CardsGameListeners;
