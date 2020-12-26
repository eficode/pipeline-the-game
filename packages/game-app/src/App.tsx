import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { PrivateRoute, RoutingPath } from '@pipeline/routing';
import { useBootstrapIsFinished } from './_shared';

function App() {
  const bootstrapIsFinished = useBootstrapIsFinished();

  return bootstrapIsFinished ? (
    <Switch>
      <Route path={RoutingPath.Login} render={() => <div>Login</div>} />
      <Route path={RoutingPath.Signup} render={() => <div>Signup</div>} />
      <PrivateRoute path={RoutingPath.Dashboard} render={() => <div>Dashboard</div>} />
      <Route path="*">
        <Redirect to={RoutingPath.Signup} />
      </Route>
    </Switch>
  ) : (
    <div>LOADING ...</div>
  );
}

export default App;
