export enum GameEventType {
  CardMovingStart = 'CardMovingStart',
  CardMovingEnd = 'CardMovingEnd',
}

type CardMovingStart = {
  type: GameEventType.CardMovingStart;
  cardId: string;
};

type CardMovingEnd = {
  type: GameEventType.CardMovingEnd;
  cardId: string;
  target: 'board' | 'panel';
  position?: {
    x: number;
    y: number;
  };
};

export type GameEvent = CardMovingStart | CardMovingEnd;
