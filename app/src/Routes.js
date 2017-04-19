/**
 * Created by NB on 4/16/2017.
 */

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AppliedRoute from './components/AppliedRoute';
import NotFound from './components/NotFound';

import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import NewNote from './containers/NewNote';

export default ({ childProps }) => (
    <Switch>
        <AppliedRoute path="/" exact component={Home} props={childProps} />
        <AppliedRoute path="/login" exact component={Login} props={childProps} />
        <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
        <AppliedRoute path="/notes/new" exact component={NewNote} props={childProps} />

        { /* Safety route to handle 404 */ }
        <Route component={NotFound}/>
    </Switch>
);