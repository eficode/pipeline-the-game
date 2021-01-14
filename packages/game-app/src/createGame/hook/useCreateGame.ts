import { createRequestHook } from '@pipeline/requests-status';
import * as actions from '../actions';

const useCreateGame = createRequestHook('createGame', actions.createGame);

export default useCreateGame;
