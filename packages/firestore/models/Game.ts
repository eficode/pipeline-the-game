import { Game as InnerGame } from '@pipeline/common';
import { FirebaseFieldValue, FirebaseTimestamp } from './FirebaseTypes';

export type Game = InnerGame<FirebaseTimestamp, FirebaseFieldValue>;
