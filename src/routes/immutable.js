import React from 'react';
import { connect } from 'dva';
import Immutable from '../components/immutable/Immutable';

function Route(props) {
    return (
        <Immutable {...props} />
    );
}

function MapStateToProps(state){
    return { immutable: state.immutable }
  }
  export default connect(MapStateToProps)(Route);
