export enum GameEventType {
  CardMovingStart = 'CardMovingStart',
  CardMovingEnd = 'CardMovingEnd',
}

type CardMovingStart = {
  type: GameEventType.CardMovingStart;
  cardId: string;
  parent: 'board' | 'panel';
};

type CardMovingEnd = {
  type: GameEventType.CardMovingEnd;
  cardId: string;
  target: 'board' | 'panel' | null;
  position?: {
    x: number;
    y: number;
  };
};

export type GameEvent = CardMovingStart | CardMovingEnd;
