import { createRequestHook } from '@pipeline/requests-status';
import { actions } from '../slice';

const useLoadGame = createRequestHook('game.loadGame', actions.loadGame);

export default useLoadGame;
