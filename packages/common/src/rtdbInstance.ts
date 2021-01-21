import {CreatedAt} from "./CreatedAt";
import {ShortUser} from "./user";

export interface RTDBInstance extends CreatedAt {
  onlineOnGameCount: number;
}
