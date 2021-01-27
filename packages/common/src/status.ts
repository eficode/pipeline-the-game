import {UpdatedAt} from "./UpdatedAt";

export interface Status<T, F> extends UpdatedAt<T, F> {
  state: 'offline' | 'online';
  gameIds: {[key: string]: boolean} | null;
}
