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
  errorMessagesScope: 'auth.errors',
});

export const useLogout = createRequestHook('auth.logout', actions.logout, {
  errorMessagesScope: 'auth.errors',
});

export const useSendResetPasswordEmail = createRequestHook(
  'auth.sendResetPasswordEmail',
  actions.sendResetPasswordEmail,
  {
    errorMessagesScope: 'auth.errors',
  },
);

export const useResetPassword = createRequestHook('auth.resetPassword', actions.resetPassword, {
  errorMessagesScope: 'auth.errors',
});

export const useVerifyActionCode = createRequestHook('auth.verifyPasswordResetCode', actions.verifyPasswordResetCode, {
  errorMessagesScope: 'auth.errors',
});
