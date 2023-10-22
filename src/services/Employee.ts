import request from '@/utils/request'

// 获取列表
export async function getEmployeeList<T>(params: T) {
  return request('/emps', {
    method: 'GET',
    params
  })
}

// 新增
export async function addEmployee<T>(data: T) {
  return request('/emps', {
    method: 'POST',
    data
  })
}

// 删除
export async function deleteEmployee<T>(id: T) {
  return request(`/emps/${id}`, {
    method: 'DELETE'
  })
}

// 编辑
export async function editEmployee<T>(data: T) {
  return request('/emps', {
    method: 'PUT',
    data
  })
}
