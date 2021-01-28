import { FirebaseTimestamp } from './FirebaseTypes';

export type Status = {
  state: 'online' | 'offline';
  updatedAt: FirebaseTimestamp;
};
