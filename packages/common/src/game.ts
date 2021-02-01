import {CreatedAt} from "./CreatedAt";
import {ShortUser} from "./user";

export interface Game<T, F> extends CreatedAt<T, F> {
  scenarioTitle: string;
  scenarioContent: string;
  scenarioCardId: string | null;
  deckId: string;
  facilitator: ShortUser;
  rtdbInstance: string | null;
  cards: { [key: string]: CardState } | null;
  boardDimensions: { x: number, y: number } | null;
  review: boolean;
}

export type RTDBGame<T, F> = Omit<Game<T, F>, 'rtdbInstance' | 'cards'>;

export interface CardState {
  parent: 'board' | 'panel';
  position?: {
    x: number,
    y: number
  };
  lockedBy: string | null;
  estimation: string;
}

export type GameEntity<T, F> = Game<T, F> & { id: string };

export const DEFAULT_BOARD_DIMENSIONS = {x: 3840, y: 2160};
