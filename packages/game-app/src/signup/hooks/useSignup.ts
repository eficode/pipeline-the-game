import { useCallback } from 'react';
import { SignupInfo } from '../types/signupInfo';
import { useDispatch } from 'react-redux';
import * as actions from '../actions';

export default function useSignup() {
  const dispatch = useDispatch();

  const execute = useCallback((info: SignupInfo) => {
    dispatch(actions.signup(info));
  }, []);

  return {
    execute,
  };
}
