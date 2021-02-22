import React, { Suspense, useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { PrivateRoute, RoutingPath, useNavigateOutsideTo } from '@pipeline/routing';
import { useBootstrapIsFinished } from './_shared';
import { AuthUser, useLoggedUser } from '@pipeline/auth';
import PersistentBanner from './_shared/components/PersistentBanner';
import { Box, Dialog, Link, Typography } from '@pipeline/components';
import { useTranslate } from '@pipeline/i18n';
import { ExternalUrl } from '@pipeline/models';
import { useWindowDimensions } from './_shared/components/utils';

const Signup = React.lazy(() => import('./signup/components/Signup'));
const EmailRouter = React.lazy(() => import('./_shared/routing/EmailRouter'));
const VerifyEmail = React.lazy(() => import('./signup/components/VerifyEmail'));
const ForgotPassword = React.lazy(() => import('./forgotPassword/components/ForgotPassword'));
const ResetPassword = React.lazy(() => import('./forgotPassword/components/ResetPassword/ResetPassword'));
const Dashboard = React.lazy(() => import('./dashboard/components/Dashboard'));
const Login = React.lazy(() => import('./login/components/Login'));
const GameView = React.lazy(() => import('./gameView/components/GameView'));
const CreateGameView = React.lazy(() => import('./createGame/components/CreateGameView'));

const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

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
      <Route path={RoutingPath.EmailRouter} component={EmailRouter} />,
      <Route path={RoutingPath.VerifyEmail} component={VerifyEmail} />,
      <Route path={RoutingPath.ForgotPassword} component={ForgotPassword} />,
      <Route path={RoutingPath.ResetPassword} component={ResetPassword} />,
      <Route path="*">
        <Redirect to={RoutingPath.Login} />
      </Route>,
    ];
  }
  if (user && !user.emailVerified) {
    return [
      <Route path={RoutingPath.Signup} component={Signup} />,
      <Route path={RoutingPath.EmailRouter} component={EmailRouter} />,
      <Route path={RoutingPath.VerifyEmail} component={VerifyEmail} />,
      <Route path="*">
        <Redirect to={RoutingPath.Signup} />
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

const Loader: React.FC = () => {
  useEffect(() => {
    return () => document.getElementById('initial-loading-overlay')?.remove();
  }, []);

  return null;
};

const SmallScreenDialog: React.FC = () => {
  const t = useTranslate();
  const { width, height } = useWindowDimensions();

  const isWindowTooSmall = width < 1100 || height < 600;

  return (
    <Dialog id="small-screen-dialog" open={isWindowTooSmall} title={t('general.responsiveness.title')}>
      <Typography textAlign="center" mt={3}>
        {t('general.responsiveness.subtitle')}
      </Typography>
    </Dialog>
  );
};

function App() {
  const bootstrapIsFinished = useBootstrapIsFinished();

  const user = useLoggedUser();
  const [state, setState] = useState(false);

  const location = useLocation<{ desiredUrl: string }>();
  const history = useHistory();
  const t = useTranslate();

  useEffect(() => {
    if (!state && user?.emailVerified && location.state?.desiredUrl) {
      history.push(location.state.desiredUrl);
      setState(true);
      //TODO: verify if this boolean state is really necessary and whether we can avoid it.
    }
  }, [location, user, history, state]);

  const goToChrome = useNavigateOutsideTo(ExternalUrl.CHROME, true);

  return bootstrapIsFinished ? (
    <Suspense fallback={<Loader />}>
      <Switch>
        <PrivateRoute path={RoutingPath.Dashboard} component={Dashboard} />
        <PrivateRoute path={`${RoutingPath.Game}/:gameId`} component={GameView} />
        <PrivateRoute path={RoutingPath.CreateGame} component={CreateGameView} />
        {renderAuthRoutes(user)}
      </Switch>
      {!isChrome && (
        <PersistentBanner key="googleChrome">
          <Box>
            <Typography as="span" fontSize="18px">
              {t('general.chromeBanner')}
            </Typography>
            <Link onClick={goToChrome} variant="blue">
              {t('general.chrome')}
            </Link>
          </Box>
        </PersistentBanner>
      )}
      <SmallScreenDialog />
    </Suspense>
  ) : null;
}

export default App;
