import { createAction } from '@reduxjs/toolkit';
import { SignupInfo } from '../types/signupInfo';

export const signup = createAction<SignupInfo>('signup/start');
