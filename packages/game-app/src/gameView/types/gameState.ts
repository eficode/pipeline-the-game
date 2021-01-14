export interface GameState {
  [cardId: string]: {
    placedIn: 'panel' | 'board';
    position?: {
      x: number;
      y: number;
    };
  };
}
