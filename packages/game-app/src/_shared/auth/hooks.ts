import { createRequestHook } from '@pipeline/requests-status';
import { actions } from './slice';

export const useResendVerificationEmail = createRequestHook(
  'auth.resendVerificationEmail',
  actions.resendEmailVerification,
);

export const useEmailVerification = createRequestHook('auth.emailVerification', actions.verifyEmail, {
  errorMessagesScope: 'auth.errors',
});

export const useLogin = createRequestHook('auth.login', actions.login, {
  errorMessagesScope: 'login.errors',
});
