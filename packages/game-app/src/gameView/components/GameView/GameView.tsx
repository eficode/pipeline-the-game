import React, { useRef } from 'react';
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
import OfflineOverlay from '../OfflineOverlay';
import ErrorOverlay from '../ErrorOverlay';
import { useWindowDimensions } from '../../../_shared/components/utils';

type GameProps = {
  zoomIn: () => void;
  zoomOut: () => void;
};

const initialPan = {
  y: -700,
  x: -15,
};
const initialPanMobile = {
  y: 0,
  x: -5,
};

const GameView: React.FC<GameProps> = ({ zoomIn, zoomOut }) => {
  const state = useSelector(selectors.getCardStateForUI);
  const params = useParams<{ gameId: string }>();

  const gameId = params.gameId;

  const { placedCardsIds, loading, notFound } = useGameState(gameId);

  const { onCardEvent } = useCardEventHandler();

  const panelModeRef = useRef<PanelMode>('stacked');
  const isSmallScreen = useWindowDimensions().width < 1100;
  useStopListenOnRtdb();

  return (
    <ZoomPanContext initialPan={isSmallScreen ? initialPanMobile : initialPan} initialScale={isSmallScreen ? 0.5 : 1}>
      <CardsGameListeners panelModeRef={panelModeRef} onEvent={onCardEvent} currentGameState={state}>
        <div className="board-wrapper">
          <TopWidgetsRow />
          <ZoomPanContainer>
            <Board>
              {placedCardsIds.map(id => (
                <DraggableCard key={id} id={id} />
              ))}
            </Board>
          </ZoomPanContainer>
          <BottomWidgetsRow />
        </div>
        {!isSmallScreen && <DeckPanel panelModeRef={panelModeRef} />}
      </CardsGameListeners>
      <LoadingOverlay isOpen={loading} />
      <ErrorOverlay isOpen={notFound} />
      <OfflineOverlay />
    </ZoomPanContext>
  );
};

GameView.displayName = 'GameView';

export default GameView;
