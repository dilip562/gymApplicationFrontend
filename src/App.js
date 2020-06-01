import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './uiComponent/loginPage/Login';
import Home from './uiComponent/Home/Home';
import PrivateRoute from './routeComponent/PrivateRoute';

const App = () => {
    return(
        <BrowserRouter>
            <Route path="/" exact component={Login} />
            <PrivateRoute path="/home" component={Home} />
        </BrowserRouter>
    )
}

export default App