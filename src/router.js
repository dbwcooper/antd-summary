import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import myForm from './routes/form';
import cssmodule from './routes/cssmodule';
import styled from './routes/styled';
import Page404 from './routes/Page404';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={myForm} />
        <Route path="/cssmodule" exact component={cssmodule} />
        <Route path="/styled" exact component={styled} />
        {/* 路由未匹配时显示/ 未改变路由*/}
        <Route path="/*" exact component={Page404} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
