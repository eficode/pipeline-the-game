import React, { useCallback, useRef, useState } from 'react';
import CardsGameListeners from '../CardsGameListeners';
import Board from '../Board';
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
import { Pan } from '../ZoomPanContainer/ZoomPanContainer';
import { calculatePanAndZoomToFitWindow } from '../../utils/fitToWindow';

type GameProps = {
  zoomIn: () => void;
  zoomOut: () => void;
};

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
    const { actualScale, pan } = calculatePanAndZoomToFitWindow(state);
    setZoomPanRef.current?.({
      scale: actualScale,
      pan: pan,
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
