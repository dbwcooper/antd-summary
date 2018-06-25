import { Map } from "immutable";
import Store from '../store/Immutable';
export default {
  namespace: 'immutable',
  state: Store,
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },
  reducers: {
    r_setState(state, payload) {
      return state.mergeDeep(payload); // 删除list中的一项 会保留相同的key
    },
    r_updateInTreeData(state, { payloadData: { path, func }}){// path: Array, func: function
      return state.updateIn(path, func) 
    },
    r_deleteInTreeData(state, { payloadData: { path }}){
      return state.deleteIn(path);
    }
  },
  effects: {
    *e_updateDataSource({ payload }, { select, put }) {
      // let { TreeData, activeKey } = yield select(state => state.immutable);
      const ImmuTable = yield select(state => state.immutable);
      const activeKey = ImmuTable.get('activeKey');
      const TreeDatas = ImmuTable.get('TreeData');
      
      let index = TreeDatas.findIndex(item => (item.getIn(['eu', 'euNo']) + '') === activeKey); // 找到显示的数组tab
      let childrenIndex = TreeDatas.getIn([index, 'children']).findIndex(item => item.getIn(['eu', 'euNo']) === payload.euNo);
      // let TreeData = '';
      if (payload.method === 'delete') {
        // TreeData = TreeDatas.deleteIn([index, 'children', childrenIndex]);
        let payloadData = {
          path: ['TreeData', index, 'children', childrenIndex]
        }
        yield put({ type: 'r_deleteInTreeData', payloadData })
      } else {
        // TreeData = TreeDatas.updateIn([index, 'children', childrenIndex, 'eu'], (value) => {
        //   return Map({...value.toJS(), ...payload});
        // })
        let payloadData = {
          path: ['TreeData', index, 'children', childrenIndex, 'eu'],
          func: (value) => {
            return Map({...value.toJS(), ...payload});
          }
        }
        yield put({ type: 'r_updateInTreeData', payloadData })
      }
    }
  },

};
