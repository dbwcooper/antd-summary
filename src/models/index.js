import * as Service from '../services';

export default {
  namespace: 'example',
  state: {
    lifecycle: {
      data: [],
      selectList: [],
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },
  effects: {
    *e_lifeCycleFetch({ payload }, { call, put }) {  // eslint-disable-line
      const lifecycle = {}
      const { data } = yield call(Service.lifeCycleFetch);

      lifecycle.data  = data.results.map(user => ({
        value: `${user.name.first} ${user.name.last}`,
        key: user.login.username,
      }));

      lifecycle.selectList = lifecycle.data.slice(0,2);
      yield put({ type: 'r_save', payload: lifecycle });
    },
  },
  reducers: {
    r_save(state, action) {
      return { ...state, lifecycle: {...action.payload }};
    },
  },

};
