import React, { useCallback, useMemo, useRef, useState } from 'react';
import CardsGameListeners from '../CardsGameListeners';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import Board from '../Board';
import { TansformRenderProps } from '../../types/tansformRenderProps';
import DraggableCard from '../DraggableCard';
import { useParams } from 'react-router-dom';
import useGameState from '../../hooks/useGameState';
import { useSelector } from 'react-redux';
import { selectors } from '../../slice';
import useCardEventHandler from '../../hooks/useCardEventHandler';
import DeckPanel from '../DeckPanel';
import BottomWidgetsRow from '../BottomWidgetsRow/BottomWidgetsRow';
import { PanelMode } from '../DeckPanel/DeckPanel';
import TopWidgetsRow from '../TopWidgetsRow';
import ZoomPanContainer from '../ZoomPanContainer';
import { GameUIState } from '../../types/gameUIState';
import { Pan } from '../ZoomPanContainer/ZoomPanContainer';

type GameProps = {
  zoomIn: () => void;
  zoomOut: () => void;
};

const wheelConfig = { step: 70 };
const transformOptions: React.ComponentProps<typeof TransformWrapper>['options'] = {
  minScale: Math.max(window.innerWidth / (1920 * 2), window.innerHeight / (1080 * 2)),
  contentClass: 'zooming-panning-board',
} as any;

type Bounds = {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
};

function getBounds(cardsState: GameUIState): Bounds {
  const bounds = {
    minX: Number.POSITIVE_INFINITY,
    minY: Number.POSITIVE_INFINITY,
    maxX: Number.NEGATIVE_INFINITY,
    maxY: Number.NEGATIVE_INFINITY,
  };

  for (const cardId in cardsState) {
    const { position } = cardsState[cardId];
    if (!position) {
      continue;
    }
    if (position.x < bounds.minX) {
      bounds.minX = position.x;
    }
    if (position.y < bounds.minY) {
      bounds.minY = position.y;
    }
    // TODO
    if (position.x + 280 > bounds.maxX) {
      bounds.maxX = position.x + 280;
    }
    if (position.y + 280 > bounds.maxY) {
      bounds.maxY = position.y + 200;
    }
  }
  return bounds;
}

function calculatePanAndZoom(bounds: Bounds) {
  const necessaryHeight = bounds.maxY - bounds.minY;
  const targetHeight = window.innerHeight;
  const yScale = targetHeight / necessaryHeight;

  const necessaryWidth = bounds.maxX - bounds.minX;
  const targetWidth = window.innerWidth;
  const xScale = targetWidth / necessaryWidth;

  const actualScale = Math.min(xScale, yScale);

  return {
    scale: actualScale,
  };
}

const GameView: React.FC<GameProps> = ({ zoomIn, zoomOut }) => {
  const state = useSelector(selectors.getCardStateForUI);
  const params = useParams<{ gameId: string }>();

  const gameId = params.gameId;

  const { deckCardsIds, placedCardsIds } = useGameState(gameId);

  const { onCardEvent } = useCardEventHandler();

  const panelModeRef = useRef<PanelMode>('stacked');

  const [background, setBackGround] = useState(true);
  const panScaleRef = useRef(1);
  const panPositionRef = useRef({ x: 0, y: 0 });
  const setZoomPanRef = useRef((props: { scale?: number; pan?: Pan }) => ({}));

  const fitWindow = useCallback(() => {
    const bounds = getBounds(state);
    console.debug('bounds', bounds);
    const { scale } = calculatePanAndZoom(getBounds(state));
    const actualScale = Math.min(scale * 0.85, 1.5);
    // center the rect in the board

    // limit maxY inside
    let panY = -((bounds.maxY + bounds.minY) / 2 - window.innerHeight / 2 / actualScale);
    let panX = -((bounds.maxX + bounds.minX) / 2 - window.innerWidth / 2 / actualScale);

    setZoomPanRef.current?.({
      scale: actualScale,
      pan: {
        x: panX * actualScale,
        y: panY * actualScale,
      },
    });
  }, [state]);

  return (
    <CardsGameListeners
      panelModeRef={panelModeRef}
      onEvent={onCardEvent}
      boardScaleRef={panScaleRef}
      panAmountRef={panPositionRef}
      currentGameState={state}
    >
      <div className="board-wrapper">
        <TopWidgetsRow toggleBackGround={() => setBackGround(s => !s)} />
        <ZoomPanContainer scaleRef={panScaleRef} panRef={panPositionRef} setZoomPanRef={setZoomPanRef}>
          <Board scale={background ? 3 : -1}>
            {placedCardsIds.map(id => (
              <DraggableCard key={id} id={id} />
            ))}
          </Board>
        </ZoomPanContainer>
        <BottomWidgetsRow fitWindow={fitWindow} zoomIn={zoomIn} zoomOut={zoomOut} />
      </div>
      <DeckPanel panelModeRef={panelModeRef} cardsIds={deckCardsIds} />
    </CardsGameListeners>
  );
};

GameView.displayName = 'GameView';

export default GameView;
