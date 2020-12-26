import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {RoutingPath} from "@pipeline/routing";

function App() {

  return (
    <Switch>
      <Route path={RoutingPath.Login} render={() => <div>Login</div>}/>
      <Route path={RoutingPath.Signup} render={() => <div>Signup</div>}/>
      <Route path={RoutingPath.Dashboard} render={() => <div>Dashboard</div>}/>
      <Route path="*">
        <Redirect to={RoutingPath.Signup}/>
      </Route>
    </Switch>
  );
}

export default App;
