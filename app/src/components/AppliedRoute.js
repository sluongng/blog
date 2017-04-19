/**
 * Created by NB on 4/19/2017.
 */

import React from 'react';
import { Route } from 'react-router-dom';

export default ({ component: C, props: cProps, ...rest }) => (
  <Route {...rest} render={ props => <C {...props} {...cProps} />} />
);