import React, { Suspense, useEffect, useState } from 'react';
import { Redirect, Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { PrivateRoute, RoutingPath } from '@pipeline/routing';
import { useBootstrapIsFinished } from './_shared';
import { AuthUser, useLoggedUser } from '@pipeline/auth';

const Signup = React.lazy(() => import('./signup/components/Signup'));
const EmailVerificationRequired = React.lazy(() => import('./signup/components/EmailVerificationRequired'));
const VerifyEmail = React.lazy(() => import('./signup/components/VerifyEmail'));
const Dashboard = React.lazy(() => import('./dashboard/components/Dashboard'));
const Login = React.lazy(() => import('./login/components/Login'));
const GameView = React.lazy(() => import('./gameView/components/GameView'));
const CreateGameView = React.lazy(() => import('./createGame/components/CreateGameView'));

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
      <Route path={RoutingPath.Login} component={Login} />,
      <Route path={RoutingPath.Signup} component={Signup} />,
      <Route path={RoutingPath.VerifyEmail} component={VerifyEmail} />,
      <Route path="*">
        <Redirect to={RoutingPath.Login} />
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
  const [state, setState] = useState(false);

  const location = useLocation<{ desiredUrl: string }>();
  const history = useHistory();

  useEffect(() => {
    if (!state && user?.emailVerified && location.state?.desiredUrl) {
      history.push(location.state.desiredUrl);
      setState(true);
      //TODO: verify if this boolean state is really necessary and whether we can avoid it.
    }
  }, [location, user, history, state]);

  return bootstrapIsFinished ? (
    <Suspense fallback={null}>
      <Switch>
        <PrivateRoute path={RoutingPath.Dashboard} component={Dashboard} />
        <PrivateRoute path={`${RoutingPath.Game}/:gameId`} component={GameView} />
        <PrivateRoute path={RoutingPath.CreateGame} component={CreateGameView} />
        {renderAuthRoutes(user)}
      </Switch>
    </Suspense>
  ) : (
    <div>LOADING ...</div>
  );
}

export default App;
