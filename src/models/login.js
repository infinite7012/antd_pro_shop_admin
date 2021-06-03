import { history } from 'umi';
import { fakeAccountLogin, loginOut } from '@/services/login';
import { message } from 'antd';
const Model = {
  namespace: 'login',
  state: {
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      if (response.status === undefined) {
        message.success('登录成功')
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        }); // Login successfully
        history.replace('/')
      }
    },

    *logout(_, { call, put }) {
      const loading = message.loading('退出中...')
      const response = yield call(loginOut);
      if (response.status === undefined) {
        message.success('退出成功')
        localStorage.removeItem('userInfo')
        localStorage.removeItem('access_token')
        history.replace('/login')
      }
      loading()
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      localStorage.setItem('access_token', payload.access_token)
      return { ...state };
    },
  },
};
export default Model;
