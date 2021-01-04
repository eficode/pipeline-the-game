import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { PrivateRoute, RoutingPath } from '@pipeline/routing';
import { useBootstrapIsFinished } from './_shared';
import { AuthUser, useLoggedUser } from '@pipeline/auth';

const Signup = React.lazy(() => import('./signup/components/Signup'));
const EmailVerificationRequired = React.lazy(() => import('./signup/components/EmailVerificationRequired'));
const VerifyEmail = React.lazy(() => import('./signup/components/VerifyEmail'));
const Dashboard = React.lazy(() => import('./dashboard/components/Dashboard'));

/**
 * Returns route and default redirect according to auth condition:
 *
 * User is not found (unauthenticated) : Signup, Login, VerifyEmail (default to Signup)
 * User authenticated but email not verified: EmailVerificationRequired, VerifyEmail (default to EmailVerificationRequired)
 * User authenticated and email is verified: (default to Dashboard)
 */
function renderAuthRoutes(user: AuthUser | null) {
  if (!user) {
    return [
      <Route path={RoutingPath.Login} render={() => <div>Login</div>} />,
      <Route path={RoutingPath.Signup} component={Signup} />,
      <Route path={RoutingPath.VerifyEmail} component={VerifyEmail} />,
      <Route path="*">
        <Redirect to={RoutingPath.Signup} />
      </Route>,
    ];
  }
  if (user && !user.emailVerified) {
    return [
      <Route path={RoutingPath.EmailVerificationRequired} component={EmailVerificationRequired} />,
      <Route path={RoutingPath.VerifyEmail} component={VerifyEmail} />,
      <Route path="*">
        <Redirect to={RoutingPath.EmailVerificationRequired} />
      </Route>,
    ];
  }
  if (user && user.emailVerified) {
    return (
      <Route path="*">
        <Redirect to={RoutingPath.Dashboard} />
      </Route>
    );
  }
}

function App() {
  const bootstrapIsFinished = useBootstrapIsFinished();

  const user = useLoggedUser();

  return bootstrapIsFinished ? (
    <Suspense fallback={null}>
      <Switch>
        <PrivateRoute path={RoutingPath.Dashboard} component={Dashboard} />
        {renderAuthRoutes(user)}
      </Switch>
    </Suspense>
  ) : (
    <div>LOADING ...</div>
  );
}

export default App;
