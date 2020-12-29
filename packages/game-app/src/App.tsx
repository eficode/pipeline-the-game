import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { PrivateRoute, RoutingPath } from '@pipeline/routing';
import { useBootstrapIsFinished } from './_shared';

const Signup = React.lazy(() => import('./signup/components/Signup'));

function App() {
  const bootstrapIsFinished = useBootstrapIsFinished();

  return bootstrapIsFinished ? (
    <Suspense fallback={null}>
      <Switch>
        <Route path={RoutingPath.Login} render={() => <div>Login</div>} />
        <Route path={RoutingPath.Signup} component={Signup} />
        <PrivateRoute path={RoutingPath.Dashboard} render={() => <div>Dashboard</div>} />
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
