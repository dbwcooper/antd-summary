import React from 'react';
import { connect } from 'dva';
import LifeCycle from '../components/react-life-cycle';

function Component(props) {
  console.log('route - lifecycle', props)
  return (
      <LifeCycle {...props} datas={[1,2,3,4,5]}/>
  );
}

function maptoProps(state){
  return state.example.lifecycle;
}

export default connect(maptoProps)(Component);
