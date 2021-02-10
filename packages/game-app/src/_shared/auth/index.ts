import { reducer, actions, name, selectors, AuthUser } from './slice';
import saga from './saga';
import useLoggedUser from './useLoggedUser';
import {
  useEmailVerification,
  useLogin,
  useLogout,
  useResendVerificationEmail,
  useSendResetPasswordEmail,
  useResetPassword,
  useVerifyActionCode,
} from './hooks';

export {
  reducer,
  actions,
  name,
  saga,
  selectors,
  useLoggedUser,
  useResendVerificationEmail,
  useEmailVerification,
  useLogin,
  useLogout,
  useSendResetPasswordEmail,
  useResetPassword,
  useVerifyActionCode,
};

export type { AuthUser };
