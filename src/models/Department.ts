import { getDepartmentList, addDepartment, deleteDepartment, updateDepartment } from '@/services/Department'

export default () => {
  // 获取部门列表
  const GetDepartmentList = <T>(data: T) => {
    return getDepartmentList(data)
  }

  // 增加部门
  const AddDepartment = <T>(data: T) => {
    return addDepartment(data)
  }

  // 删除部门
  const DeleteDepartment = <T>(data: T) => {
    return deleteDepartment(data)
  }

  // 修改部门
  const UpdateDepartment = <T>(data: T) => {
    return updateDepartment(data)
  }

  return {
    GetDepartmentList,
    AddDepartment,
    DeleteDepartment,
    UpdateDepartment
  }
}
