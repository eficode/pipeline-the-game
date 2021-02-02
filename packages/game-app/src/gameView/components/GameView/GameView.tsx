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
import ZoomPanContext from '../ZoomPanContext';
import useStopListenOnRtdb from '../../hooks/useStopListenOnRtdb';
import LoadingOverlay from '../LoadingOverlay';

type GameProps = {
  zoomIn: () => void;
  zoomOut: () => void;
};

const initialPan = {
  y: -700,
  x: 0,
};

const GameView: React.FC<GameProps> = ({ zoomIn, zoomOut }) => {
  const state = useSelector(selectors.getCardStateForUI);
  const params = useParams<{ gameId: string }>();

  const gameId = params.gameId;

  const { placedCardsIds, loading } = useGameState(gameId);

  const { onCardEvent } = useCardEventHandler();

  const panelModeRef = useRef<PanelMode>('stacked');

  const [background, setBackGround] = useState(true);

  const toggleBackground = useCallback(() => {
    setBackGround(s => !s);
  }, []);

  useStopListenOnRtdb();

  return (
    <ZoomPanContext initialPan={initialPan}>
      <CardsGameListeners panelModeRef={panelModeRef} onEvent={onCardEvent} currentGameState={state}>
        <div className="board-wrapper">
          <TopWidgetsRow toggleBackGround={toggleBackground} />
          <ZoomPanContainer>
            <Board scale={background ? 3 : -1}>
              {placedCardsIds.map(id => (
                <DraggableCard key={id} id={id} />
              ))}
            </Board>
          </ZoomPanContainer>
          <BottomWidgetsRow />
        </div>
        <DeckPanel panelModeRef={panelModeRef} />
      </CardsGameListeners>
      <LoadingOverlay isOpen={loading} />
    </ZoomPanContext>
  );
};

GameView.displayName = 'GameView';

export default GameView;
