import { createRequestHook } from '@pipeline/requests-status';
import { actions } from './slice';

export const useResendVerificationEmail = createRequestHook(
  'auth.resendVerificationEmail',
  actions.resendEmailVerification,
);
