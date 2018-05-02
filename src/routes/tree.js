import React from 'react';
import { connect } from 'dva';
import Tree from '../components/Tree';

function TreeRoute(props) {
  console.log('TreeRoute', props);
  return (
    <Tree treeData={props.tree.treeData}/>
  );
}

function MapStateToProps(state){
  return state
}
export default connect(MapStateToProps)(TreeRoute);
