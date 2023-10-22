import request from '@/utils/request'

// 获取部门列表
export async function getDepartmentList<T>(data: T) {
  return request('/depts', {
    method: 'GET',
    params: data
  })
}

// 增加部门
export async function addDepartment<T>(data: T) {
  return request('/depts', {
    method: 'POST',
    data
  })
}

// 删除部门
export async function deleteDepartment<T>(id: T) {
  return request(`/depts/${id}`, {
    method: 'DELETE'
  })
}

// 修改部门
export async function updateDepartment<T>(data: T) {
  return request(`/depts`, {
    method: 'PUT',
    data
  })
}
