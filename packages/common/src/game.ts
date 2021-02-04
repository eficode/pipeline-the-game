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
  lastPlayerDisconnectedAt?: T | F | null;
  movedAt?: T | F;
}

export type RTDBGame<T, F> = Omit<Game<T, F>, 'rtdbInstance' | 'cards' | 'movedAt'>;

export interface CardState {
  parent: 'board' | 'panel';
  /**
   * if it is being moving
   */
  lockedBy: string | null;
  /**
   * Card z-index to put it in front of all the others when drag finish
   */
  zIndex: number | null;
  /**
   * absolute position inside the board
   */
  position?: {
    x: number;
    y: number;
  };
  /**
   * time estimation placed inside the card
   */
  estimation?: string;
}

export type GameEntity<T, F> = Game<T, F> & { id: string };

export const DEFAULT_BOARD_DIMENSIONS = {x: 3840, y: 2160};

export const DEFAULT_Z_INDEX = -1000;
