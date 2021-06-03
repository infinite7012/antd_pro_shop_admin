import request from '@/utils/request';
export async function fakeAccountLogin(params) {
  return request('/auth/login', {
    method: 'POST',
    data: params,
  });
}
export async function loginOut() {
  return request('/auth/logout', {
    method: 'POST',
  });
}
