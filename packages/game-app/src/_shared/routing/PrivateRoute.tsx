import { selectors as authSelectors } from '@pipeline/auth';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RoutingPath } from '@pipeline/routing';

type Props = React.ComponentProps<typeof Route>;

/**
 * A Route which is aware of the authentication status of the current user.
 * If the user is not authenticated, it redirects to the SignUp Route.
 * If the user is authenticated, it behaves like a standard Route component.
 */
const PrivateRoute: React.FC<Props> = (props) => {
  
  const currentUser = useSelector(authSelectors.getCurrentUser);

  return currentUser ? <Route {...props}/> : <Redirect to={RoutingPath.Signup}/>
}


PrivateRoute.displayName = 'PrivateRoute';

export default PrivateRoute;