import { createRequestHook } from '@pipeline/requests-status';
import * as actions from '../actions';
import { useSelector } from 'react-redux';
import { selectors } from '../../gameView/slice';
import { GameEntity } from '@pipeline/models';

const _useCreateGame = createRequestHook('createGame', actions.createGame);

export default function useCreateGame() {
  const request = _useCreateGame();

  const game: GameEntity | null = useSelector(selectors.getGame);

  return {
    ...request,
    newCreatedId: !game ? null : game.id,
  };
}
