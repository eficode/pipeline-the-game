export interface GameUIState {
  [cardId: string]: {
    placedIn: 'panel' | 'board';
    position?: {
      x: number;
      y: number;
    };
  };
}
