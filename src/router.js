import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import ReactCssModule from './components/react-css-module';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/cssmodule" exact component={ReactCssModule} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
