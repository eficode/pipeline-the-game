import React, { useRef, useState } from 'react';
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

  return (
    <ZoomPanContext>
      <CardsGameListeners panelModeRef={panelModeRef} onEvent={onCardEvent} currentGameState={state}>
        <div className="board-wrapper">
          <TopWidgetsRow toggleBackGround={() => setBackGround(s => !s)} />
          <ZoomPanContainer>
            <Board scale={background ? 3 : -1}>
              {placedCardsIds.map(id => (
                <DraggableCard key={id} id={id} />
              ))}
            </Board>
          </ZoomPanContainer>
          <BottomWidgetsRow />
        </div>
        <DeckPanel panelModeRef={panelModeRef} cardsIds={deckCardsIds} />
      </CardsGameListeners>
    </ZoomPanContext>
  );
};

GameView.displayName = 'GameView';

export default GameView;
