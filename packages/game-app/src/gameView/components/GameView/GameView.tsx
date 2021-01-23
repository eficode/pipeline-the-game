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

type GameProps = {
  scale: number;
  zoomIn: () => void;
  zoomOut: () => void;
  fitWindow: () => void;
};

const wheelConfig = { step: 70 };
const transformOptions: React.ComponentProps<typeof TransformWrapper>['options'] = {
  minScale: Math.max(window.innerWidth / (1920 * 2), window.innerHeight / (1080 * 2)),
  contentClass: 'zooming-panning-board',
} as any;

const GameView: React.FC<GameProps> = ({ scale, fitWindow, zoomIn, zoomOut }) => {
  const state = useSelector(selectors.getCardStateForUI);
  const params = useParams<{ gameId: string }>();

  const gameId = params.gameId;

  const { deckCardsIds, placedCardsIds } = useGameState(gameId);

  const { onCardEvent } = useCardEventHandler();

  const panelModeRef = useRef<PanelMode>('stacked');

  const [background, setBackGround] = useState(true);
  const panScaleRef = useRef(1);
  const panPositionRef = useRef({ x: 0, y: 0 });

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
        <ZoomPanContainer scaleRef={panScaleRef} panRef={panPositionRef}>
          <Board scale={background ? scale : -1}>
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
