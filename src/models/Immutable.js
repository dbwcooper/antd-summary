import Store from '../store/Immutable';

export default {
  namespace: 'immutable',
  state: Store,
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },
  reducers: {
    r_setState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *e_updateDataSource({ payload }, { select, put }) {
      let { TreeData, activeKey } = yield select(state => state.immutable);
      let index = TreeData.findIndex(item => item.eu.euNo == activeKey);
      let childrenIndex = TreeData[index].children.findIndex(item => item.eu.euNo == payload.euNo);
      if (payload.method === 'delete') {
        TreeData[index].children.splice(childrenIndex, 1);
      } else {
        TreeData[index].children[childrenIndex].eu = {...TreeData[index].children[childrenIndex].eu, ...payload};
      }
      let payloadData = { TreeData }
      yield put({ type: 'r_setState', payloadData })
    }
  },

};
