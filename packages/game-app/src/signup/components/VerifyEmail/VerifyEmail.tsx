import React, { useEffect } from 'react';
import { VerifyEmailParams } from '../../types/emailValidationParams';
import { RoutingPath, useNavigateOnCondition, useQueryParams } from '@pipeline/routing';
import { useEmailVerification } from '@pipeline/auth';
import { useLocation } from 'react-router-dom';

type Props = {};

const VerifyEmail: React.FC<Props> = () => {
  let params = useQueryParams<VerifyEmailParams>();

  const { call, success, translatedError } = useEmailVerification();

  useEffect(() => {
    call({ code: params.oobCode });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let redirectUrl: string;
  if (params.continueUrl) {
    redirectUrl = new URL(params.continueUrl).pathname;
  } else {
    redirectUrl = RoutingPath.Dashboard;
  }

  const location = useLocation<{ desiredUrl: string }>();

  useEffect(() => {
    location.state = {
      desiredUrl: redirectUrl,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useNavigateOnCondition(success, RoutingPath.Login, {
    desiredUrl: redirectUrl,
  }); // This is ran only if the user is not logged.

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
