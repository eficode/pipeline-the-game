import React, { Suspense } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { PrivateRoute, RoutingPath } from '@pipeline/routing';
import { useBootstrapIsFinished } from './_shared';
import { useLoggedUser } from '@pipeline/auth';

const Signup = React.lazy(() => import('./signup/components/Signup'));
const EmailVerificationRequired = React.lazy(() => import('./signup/components/EmailVerificationRequired'));
const VerifyEmail = React.lazy(() => import('./signup/components/VerifyEmail'));
const Dashboard = React.lazy(() => import('./dashboard/components/Dashboard'));

function App() {
  const bootstrapIsFinished = useBootstrapIsFinished();

  const user = useLoggedUser();

  const { pathname } = useLocation();

  return bootstrapIsFinished ? (
    <Suspense fallback={null}>
      <Switch>
        {user &&
        !user.emailVerified &&
        pathname !== RoutingPath.EmailVerificationRequired &&
        pathname !== RoutingPath.VerifyEmail ? (
          <Route path="*">
            <Redirect to={RoutingPath.EmailVerificationRequired} />
          </Route>
        ) : null}
        <Route path={RoutingPath.Login} render={() => <div>Login</div>} />
        <Route path={RoutingPath.Signup} component={Signup} />
        <Route path={RoutingPath.EmailVerificationRequired} component={EmailVerificationRequired} />
        <Route path={RoutingPath.VerifyEmail} component={VerifyEmail} />
        <PrivateRoute path={RoutingPath.Dashboard} component={Dashboard} />
        <Route path="*">
          <Redirect to={RoutingPath.Signup} />
        </Route>
      </Switch>
    </Suspense>
  ) : (
    <div>LOADING ...</div>
  );
}

export default App;
