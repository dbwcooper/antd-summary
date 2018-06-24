
import euTreeData from '../assets/eutree.json';
export default {
  namespace: 'tree',
  state: {
    treeData:[]
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      dispatch({ type: 'r_save', euTreeData})
    },
  },
  effects: {
  },
  reducers: {
    r_save(state, { euTreeData }) {
      return { ...state, treeData: euTreeData.data.children };
    },
  },

};
