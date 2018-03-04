import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import myForm from './routes/form';
import ReactCssModule from './components/react-css-module';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={myForm} />
        <Route path="/cssmodule" exact component={ReactCssModule} />
        <Route path="/form" exact component={ReactCssModule} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
