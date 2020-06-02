import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated, isAdmin } from '../apiHandlers/authHandler';

const AdminRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props)=>
        isAuthenticated() && isAdmin() ?<Component /> : 
        <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
    } />
)

export default AdminRoute