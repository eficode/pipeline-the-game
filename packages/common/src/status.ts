import {UpdatedAt} from "./UpdatedAt";

export interface Status extends UpdatedAt {
  state: 'offline' | 'online';
  gameId: string | null;
}
