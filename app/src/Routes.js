/**
 * Created by NB on 4/16/2017.
 */

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './containers/Home';
import Login from './containers/Login';
import NotFound from './components/NotFound';

export default () => (
    <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/login" component={Login}/>
        { /* Safety route to handle 404 */ }
        <Route component={NotFound}/>
    </Switch>
);