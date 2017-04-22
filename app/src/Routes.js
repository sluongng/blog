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
import NewEntry from './containers/NewEntry';
import Entries from './containers/Entries';

export default ({ childProps }) => (
    <Switch>
        <AppliedRoute path="/" exact component={Home} props={childProps} />
        <AppliedRoute path="/login" exact component={Login} props={childProps} />
        <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
        <AppliedRoute path="/entries/new" exact component={NewEntry} props={childProps} />
        <AppliedRoute path="/entries/:id" exact component={Entries} props={childProps} />

        { /* Safety route to handle 404 */ }
        <Route component={NotFound}/>
    </Switch>
);