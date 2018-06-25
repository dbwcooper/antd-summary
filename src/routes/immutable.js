import React from 'react';
import { connect } from 'dva';
import Immutable from '../components/immutable/Immutable';

function Route(props) {
    return (
        <Immutable {...props} />
    );
}

function MapStateToProps(state){
    return state
  }
  export default connect(MapStateToProps)(Route);
