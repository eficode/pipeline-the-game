import * as actions from '../actions';
import { createRequestHook } from '@pipeline/requests-status';

const useSignup = createRequestHook('signup', actions.signup, {
  errorMessagesScope: 'signup.errors',
});

export default useSignup;
