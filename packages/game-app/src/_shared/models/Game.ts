import { Game as InnerGame, GameEntity as InnerGameEntity } from '@pipeline/common';
import { FirebaseFieldValue, FirebaseTimestamp } from './FirebaseTypes';

export type Game = InnerGame<FirebaseTimestamp, FirebaseFieldValue>;

export type GameEntity = InnerGameEntity<FirebaseTimestamp, FirebaseFieldValue>;
