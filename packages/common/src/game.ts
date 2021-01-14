import {CreatedAt} from "./CreatedAt";
import {ShortUser} from "./user";

export interface Game extends CreatedAt {
  scenarioTitle: string;
  scenarioContent: string;
  scenarioCardId: string | null;
  deckId: string;
  facilitator: ShortUser,
}
