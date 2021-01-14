import { createAction } from '@reduxjs/toolkit';
import { GameCreationData } from '../types/gameCreationData';

export const createGame = createAction<GameCreationData>('createGame/start');
