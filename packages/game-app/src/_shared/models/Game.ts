import { Game as InnerGame, GameEntity as InnerGameEntity, RTDBGame as InnerRTDBGame } from '@pipeline/common';
import { FirebaseFieldValue, FirebaseTimestamp } from './FirebaseTypes';

export type Game = InnerGame<FirebaseTimestamp, FirebaseFieldValue>;
export type RTDBGame = InnerRTDBGame<FirebaseTimestamp, FirebaseFieldValue>;

export type GameEntity = InnerGameEntity<FirebaseTimestamp, FirebaseFieldValue>;
