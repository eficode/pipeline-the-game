import React, { useCallback, useState } from 'react';
import CardsGameListeners from '../CardsGameListeners';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import Board from '../Board';
import Panel from '../Panel';
import { TansformRenderProps } from '../../types/tansformRenderProps';
import DraggableCard from '../DraggableCard';
import { GameUIState } from '../../types/gameUIState';
import { GameEvent, GameEventType } from '../../types/gameEvents';
import { useParams } from 'react-router-dom';
import useGameState from '../../hooks/useGameState';
import { useSelector } from 'react-redux';
import { selectors } from '../../slice';
import useCardEventHandler from '../../hooks/useCardEventHandler';

const Game: React.FC<{ pan: { x: number; y: number }; scale: number; gameId: string }> = React.memo(
  ({ pan, scale, gameId }) => {
    const state = useSelector(selectors.getCardStateForUI);

    const { deckCardsIds, placedCardsIds } = useGameState(gameId);

    const { onCardEvent } = useCardEventHandler();

    return (
      <CardsGameListeners onEvent={onCardEvent} boardScale={scale} panAmount={pan} currentGameState={state}>
        <div className="board-wrapper">
          <TransformComponent ref={ref => console.debug('ref', ref)}>
            <Board>
              {placedCardsIds.map(id => (
                <DraggableCard key={id} id={id} />
              ))}
            </Board>
          </TransformComponent>
        </div>
        <Panel>
          {deckCardsIds.map(id => (
            <DraggableCard key={id} id={id} />
          ))}
        </Panel>
      </CardsGameListeners>
    );
  },
);

const wheelConfig = { step: 70 };
const transformOptions: React.ComponentProps<typeof TransformWrapper>['options'] = {
  minScale: 0.5,
  contentClass: 'zooming-panning-board',
} as any;

const GameView: React.FC = () => {
  const params = useParams<{ gameId: string }>();

  const gameId = params.gameId;

  const renderGame = useCallback(
    (transformProps: TansformRenderProps) => {
      const scale = transformProps.scale;
      const pan = { x: transformProps.positionX, y: transformProps.positionY };
      return <Game pan={pan} scale={scale} gameId={gameId} />;
    },
    [gameId],
  );

  return (
    <TransformWrapper defaultScale={1} options={transformOptions} wheel={wheelConfig}>
      {renderGame}
    </TransformWrapper>
  );
};

GameView.displayName = 'GameView';

export default GameView;
