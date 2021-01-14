import React, { useCallback, useState } from 'react';
import CardsGameListeners from '../CardsGameListeners';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import Board from '../Board';
import Panel from '../Panel';
import { TansformRenderProps } from '../../types/tansformRenderProps';
import DraggableCard from '../DraggableCard';
import { GameState } from '../../types/gameState';
import { GameEvent, GameEventType } from '../../types/gameEvents';

const cardsNum = 10;

const initialState = new Array(cardsNum)
  .fill(null)
  .map((value, index) => index)
  .reduce((previousValue, currentValue) => {
    return {
      ...previousValue,
      [currentValue]: {
        placedIn: 'panel',
      },
    };
  }, {} as GameState);

const Game: React.FC<{ pan: { x: number; y: number }; scale: number }> = React.memo(({ pan, scale }) => {
  const [state, setState] = useState<GameState>(initialState);

  const onCardEvent = useCallback((event: GameEvent) => {
    if (event.type === GameEventType.CardMovingEnd) {
      const { cardId, target } = event;
      setState(currentState => {
        return {
          ...currentState,
          [cardId]: {
            placedIn: target,
            position: event.position,
          },
        };
      });
    }
  }, []);

  return (
    <CardsGameListeners onEvent={onCardEvent} boardScale={scale} panAmount={pan} currentGameState={state}>
      <div className="board-wrapper">
        <TransformComponent ref={ref => console.debug('ref', ref)}>
          <Board>
            {Object.entries(state)
              .filter(([key, state]) => state.placedIn === 'board')
              .map(([key, state]) => (
                <DraggableCard key={key} id={key} position={state.position} />
              ))}
          </Board>
        </TransformComponent>
      </div>
      <Panel>
        {Object.entries(state)
          .filter(([key, state]) => state.placedIn === 'panel')
          .map(([key, state]) => (
            <DraggableCard key={key} id={key} />
          ))}
      </Panel>
    </CardsGameListeners>
  );
});

const wheelConfig = { step: 70 };
const transformOptions: React.ComponentProps<typeof TransformWrapper>['options'] = {
  minScale: 0.5,
  contentClass: 'zooming-panning-board',
} as any;

const GameView: React.FC = () => {
  const renderGame = useCallback((transformProps: TansformRenderProps) => {
    const scale = transformProps.scale;
    const pan = { x: transformProps.positionX, y: transformProps.positionY };
    return <Game pan={pan} scale={scale} />;
  }, []);

  return (
    <TransformWrapper defaultScale={1} options={transformOptions} wheel={wheelConfig}>
      {renderGame}
    </TransformWrapper>
  );
};

GameView.displayName = 'GameView';

export default GameView;
