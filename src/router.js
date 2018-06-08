import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import myForm from './routes/form';
import cssmodule from './routes/cssmodule';
import styled from './routes/styled';
import Page404 from './routes/page404';
import Debounce from './routes/debounce';
import LifeCycle from './routes/lifecycle';
import Portals from './routes/portals';
import ErrorCatch from './routes/errorcatch';
import Tree from './routes/tree';
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={myForm} />
        <Route path="/cssmodule" exact component={cssmodule} />
        <Route path="/styled" exact component={styled} />
        <Route path="/debounce" exact component={Debounce} />
        <Route path="/lifecycle" exact component={LifeCycle} />
        <Route path="/portals" exact component={Portals} />
        <Route path="/error" exact component={ErrorCatch} />
        <Route path="/tree" exact component={Tree} />
        {/* 路由未匹配时显示/ 未改变路由*/}
        <Route path="/*" exact component={Page404} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
