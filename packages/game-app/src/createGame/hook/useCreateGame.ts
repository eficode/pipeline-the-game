import { createRequestHook } from '@pipeline/requests-status';
import * as actions from '../actions';
import { useSelector } from 'react-redux';
import { selectors } from '../../gameView/slice';

const _useCreateGame = createRequestHook('createGame', actions.createGame);

export default function useCreateGame() {
  const request = _useCreateGame();

  const newCreatedId = useSelector(selectors.getSelectedGameId);

  return {
    ...request,
    newCreatedId,
  };
}
