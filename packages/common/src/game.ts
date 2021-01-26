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
  boardDimensions: {x: number, y: number} | null;
}

export interface RTDBGame<T, F> extends CreatedAt<T, F> {
  scenarioTitle: string;
  scenarioContent: string;
  scenarioCardId: string | null;
  deckId: string;
  facilitator: ShortUser;
  boardDimensions: {x: number, y: number} | null;
}

export interface CardState {
  parent: 'board'| 'panel';
  position?: {
    x: number,
    y: number
  };
  lockedBy: string | null;
  estimation: string;
}
