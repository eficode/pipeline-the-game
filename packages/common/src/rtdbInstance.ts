import {CreatedAt} from "./CreatedAt";

export interface RTDBInstance extends CreatedAt {
  onlineOnGameCount: number;
  region: string;
}
