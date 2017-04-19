/**
 * Created by NB on 4/16/2017.
 */

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppliedRoute from './components/AppliedRoute';

import Home from './containers/Home';
import Login from './containers/Login';
import NotFound from './components/NotFound';

export default ({ childProps }) => (
    <Switch>
        <AppliedRoute path="/" exact component={Home} props={childProps} />
        <AppliedRoute path="/login" exact component={Login} props={childProps} />

        { /* Safety route to handle 404 */ }
        <Route component={NotFound}/>
    </Switch>
);