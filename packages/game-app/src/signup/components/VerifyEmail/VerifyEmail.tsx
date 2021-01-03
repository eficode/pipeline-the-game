import React, { useEffect } from 'react';
import { VerifyEmailParams } from '../../types/emailValidationParams';
import { RoutingPath, useNavigateOnCondition, useQueryParams } from '@pipeline/routing';
import { useEmailVerification, useLoggedUser } from '@pipeline/auth';

type Props = {};

const VerifyEmail: React.FC<Props> = () => {
  let params = useQueryParams<VerifyEmailParams>();

  const { call, success, translatedError } = useEmailVerification();
  const loggedUser = useLoggedUser();

  useEffect(() => {
    call({ code: params.oobCode });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useNavigateOnCondition(success, loggedUser ? RoutingPath.Dashboard : RoutingPath.Login);

  return (
    <div>
      {translatedError ? (
        <div>
          <span className="error-message">{translatedError}</span>
        </div>
      ) : null}
    </div>
  );
};

VerifyEmail.displayName = 'VerifyEmail';

export default VerifyEmail;
