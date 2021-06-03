import request from '@/utils/request';
export async function fetchDashBoard() {
    return request('/admin/index', {
    });
  }