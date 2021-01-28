import { FirebaseTimestamp } from '@pipeline/models';

export interface GameCreationData {
  scenarioTitle: string;
  scenarioContent: string;
  createdAt?: FirebaseTimestamp;
  scenarioCardId?: string;
}
