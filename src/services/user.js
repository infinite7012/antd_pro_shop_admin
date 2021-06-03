import request from '@/utils/request';
export async function queryCurrent() {
  return request('/admin/user');
}

export async function getUserData(params) {
  return request('/admin/users', { params })
}

export async function lockUser(uid) {
  return request(`/admin/users/${uid}/lock`, {
    method: 'PATCH'
  })
}

export async function addUser(params) {
  return request('/admin/users', {
    method: 'POST',
    params: params
  })
}

export async function showUser(id) {
  return request(`/admin/users/${id}`, {
  })
}

export async function updateUser(id, params) {
  return request(`/admin/users/${id}`, {
    method: 'PUT',
    params: params
  })
}