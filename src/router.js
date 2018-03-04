import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import myForm from './routes/form';
import cssmodule from './routes/cssmodule';
import styled from './routes/styled';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={myForm} />
        <Route path="/cssmodule" exact component={cssmodule} />
        <Route path="/styled" exact component={styled} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
