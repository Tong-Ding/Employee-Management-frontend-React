import { getEmployeeList, addEmployee, deleteEmployee, editEmployee } from '@/services/Employee'

export default () => {
  // 获取列表
  const GetEmployeeList = <T>(params: T) => {
    return getEmployeeList(params)
  }

  // 新增
  const AddEmployee = <T>(data: T) => {
    return addEmployee(data)
  }

  // 删除
  const DeleteEmployee = <T>(id: T) => {
    return deleteEmployee(id)
  }

  // 编辑
  const EditEmployee = <T>(data: T) => {
    return editEmployee(data)
  }

  return {
    GetEmployeeList,
    AddEmployee,
    DeleteEmployee,
    EditEmployee
  }
}
