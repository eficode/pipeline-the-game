import React, { useMemo } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { RoutingPath, useQueryParams } from '@pipeline/routing';
import { LinkUrlParams } from '@pipeline/models';

/**
 * A Router that redirects the user depending on the mode found as url param
 */
const EmailRouter: React.FC = () => {
  let params = useQueryParams<LinkUrlParams>();
  const { search } = useLocation();

  const redirectTo = useMemo(() => {
    return {
      pathname: params.mode === 'resetPassword' ? RoutingPath.ResetPassword : RoutingPath.VerifyEmail,
      search,
    };
  }, [search, params]);

  if (!params || !params.mode) {
    return null;
  }

  return <Redirect to={redirectTo} />;
};

EmailRouter.displayName = 'EmailRouter';

export default EmailRouter;
