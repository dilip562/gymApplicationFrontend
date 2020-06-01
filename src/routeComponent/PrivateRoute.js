import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../apiHandlers/authHandler';

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props)=>
        isAuthenticated() ?<Component /> : 
        <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
    } />
)

export default PrivateRoute