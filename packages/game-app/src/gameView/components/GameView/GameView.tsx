import React, { useCallback, useMemo } from 'react';
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

type GameProps = {
  pan: { x: number; y: number };
  scale: number;
  gameId: string;
  zoomIn: () => void;
  zoomOut: () => void;
  fitWindow: () => void;
};

const Game: React.FC<GameProps> = React.memo(({ pan, scale, gameId, fitWindow, zoomIn, zoomOut }) => {
  const state = useSelector(selectors.getCardStateForUI);

  const { deckCardsIds, placedCardsIds } = useGameState(gameId);

  const { onCardEvent } = useCardEventHandler();

  return (
    <CardsGameListeners onEvent={onCardEvent} boardScale={scale} panAmount={pan} currentGameState={state}>
      <div className="board-wrapper">
        <TransformComponent>
          <Board>
            {placedCardsIds.map(id => (
              <DraggableCard key={id} id={id} />
            ))}
          </Board>
        </TransformComponent>
        <BottomWidgetsRow fitWindow={fitWindow} zoomIn={zoomIn} zoomOut={zoomOut} />
      </div>
      <DeckPanel cardsIds={deckCardsIds} />
    </CardsGameListeners>
  );
});

const wheelConfig = { step: 70 };
const transformOptions: React.ComponentProps<typeof TransformWrapper>['options'] = {
  minScale: 0.5,
  contentClass: 'zooming-panning-board',
} as any;

const GameWrapper = ({ gameId, transformProps }: { transformProps: TansformRenderProps; gameId: string }) => {
  console.debug(transformProps);
  const { scale, zoomIn, zoomOut, positionX, positionY, setScale } = transformProps;
  const pan = useMemo(() => ({ x: positionX, y: positionY }), [positionX, positionY]);
  const fitWindow = useCallback(() => {
    setScale(0.5);
  }, [setScale]);

  return <Game pan={pan} scale={scale} gameId={gameId} zoomIn={zoomIn} zoomOut={zoomOut} fitWindow={fitWindow} />;
};

const GameView: React.FC = () => {
  const params = useParams<{ gameId: string }>();

  const gameId = params.gameId;

  const renderGame = useCallback(
    (transformProps: TansformRenderProps) => {
      return <GameWrapper transformProps={transformProps} gameId={gameId} />;
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
