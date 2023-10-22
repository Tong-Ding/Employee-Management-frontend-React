import React, { useEffect, useState, useRef } from 'react'
import { useModel } from '@umijs/max'
import ProTable from '@ant-design/pro-table'
import enUS from 'antd/locale/en_US'
import { ConfigProvider } from 'antd'
import { App, Button, Popconfirm, Form, Input, Select, DatePicker } from 'antd'
import dayjs from 'dayjs'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'

export default () => {
  const { GetEmployeeList, AddEmployee, DeleteEmployee, EditEmployee } = useModel('Employee')
  const { GetDepartmentList } = useModel('Department')

  const { message, modal } = App.useApp()

  const [pageSize, setPageSize] = useState(10) //  每页数量
  const [currentPage, setCurrentPage] = useState(1) //  当前页码

  const tableRef = useRef()
  const [employeeFormRef] = Form.useForm()

  const originColumns = [
    // {
    //   title: 'Username',
    //   dataIndex: 'username',
    //   width: 150
    // },
    {
      title: 'Name',
      dataIndex: 'name',
      width: 150
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      width: 100,
      valueEnum: {
        1: {
          text: 'Male',
          status: 'Processing'
        },
        2: {
          text: 'Female',
          status: 'Success'
        }
      }
    },
    {
      title: 'Position',
      dataIndex: 'job',
      hideInSearch: true, // 该列不会在搜索框或筛选器中显示
      width: 180,
      valueEnum: {
        1: {
          text: 'Supervisor',
          status: 'Default'
        },
        2: {
          text: 'Lecturer',
          status: 'Processing'
        },
        3: {
          text: 'Student Affairs',
          status: 'Success'
        },
        4: {
          text: 'Research Manager',
          status: 'Error'
        }
      }
    },
    {
      title: 'Entry Date',
      dataIndex: 'entrydate',
      width: 180,
      valueType: 'dateRange',
      render: (text, row) => <div>{row.entrydate}</div>
    },
    {
      title: 'Last Update Time',
      dataIndex: 'updateTime',
      hideInSearch: true,
      width: 180,
      render: (text, row) => {
        return dayjs(text).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: 'Action',
      key: 'option',
      width: 150,
      valueType: 'option',
      fixed: 'right',
      render: (_, row) => {
        return (
          <>
            <Button type='link' onClick={() => handleAddAndEdit('Edit', row)}>
              Edit
            </Button>
            <Popconfirm
              key='delete'
              title='Are you sure to delete？'
              onConfirm={() => handleDelete('one', row.id)}
              okText='Confirm'
              cancelText='Cancel'
            >
              <Button type='link' danger>
                Delete
              </Button>
            </Popconfirm>
          </>
        )
      }
    }
  ]

  const [currentSelectedRowKeys, setCurrentSelectedRowKeys] = useState([])
  const [departmentList, setDepartmentList] = useState([]) //  部门列表

  const handleSelectChange = selectedRowKeys => {
    setCurrentSelectedRowKeys(selectedRowKeys)
  }

  const handleAddAndEdit = async (type, row) => {
    if (type === 'Edit') {
      employeeFormRef.setFieldsValue({
        id: row.id,
        username: row.username,
        name: row.name,
        gender: row.gender,
        job: row.job,
        entrydate: dayjs(row.entrydate),
        deptId: row.deptId
      })
    }

    const EmployeeForm = () => {
      return (
        <Form preserve={false} layout='vertical' form={employeeFormRef} name='employeeData'>
          {/* <Form.Item name='username' label='Username : ' rules={[{ required: true, message: 'Please enter Username' }]}>
            <Input placeholder='Please enter Username' allowClear />
          </Form.Item> */}

          <Form.Item
            name='name'
            label='Employee Name : '
            rules={[{ required: true, message: 'Please enter employee name' }]}
          >
            <Input placeholder='Please enter employee name' allowClear />
          </Form.Item>

          <Form.Item name='gender' label='Gender : ' rules={[{ required: true, message: 'Please select gender' }]}>
            <Select
              placeholder='Please select gender'
              options={[
                { value: 1, label: 'Male' },
                { value: 2, label: 'Female' }
              ]}
            ></Select>
          </Form.Item>

          <Form.Item name='job' label='Position : ' rules={[{ required: true, message: 'Please select Position' }]}>
            <Select
              placeholder='Please select Position'
              options={[
                { value: 1, label: 'Head Teacher' },
                { value: 2, label: 'Lecturer' },
                { value: 3, label: 'Student Affairs Supervisor' },
                { value: 4, label: 'Academic Research Supervisor' }
              ]}
            ></Select>
          </Form.Item>

          <Form.Item
            name='entrydate'
            label='Entry Date : '
            rules={[{ required: true, message: 'Please select Entry Date' }]}
          >
            <DatePicker
              placeholder='Please select Entry Date'
              style={{ width: '100%' }}
              format='YYYY-MM-DD'
              allowClear
            />
          </Form.Item>

          {/* 获取部门*/}
          <Form.Item
            name='deptId'
            label='Department : '
            rules={[{ required: true, message: 'Please select Department' }]}
          >
            {departmentList && departmentList.length > 0 ? (
              <Select placeholder='Please select Department' options={departmentList}></Select>
            ) : null}
          </Form.Item>
        </Form>
      )
    }

    modal.confirm({
      title: type + ' Department',
      content: <EmployeeForm />,
      okText: 'confirm',
      maskClosable: true,
      style: { top: 20 },
      cancelText: 'cancel',
      onOk: async () => {
        await employeeFormRef.validateFields()
        let employeeData = employeeFormRef.getFieldsValue()
        employeeData = {
          ...employeeData,
          id: row.id,
          username: employeeData.name
        }

        if (type === 'Add') {
          const res = await AddEmployee(employeeData)

          if (res === null) {
            message.success('Add success')
            tableRef.current.reload()
          }
        } else {
          const res = await EditEmployee(employeeData)

          if (res === null) {
            message.success('Edit success')
            tableRef.current.reload()
          }
        }
      }
    })
  }

  const handleDelete = async (type, id) => {
    if (type === 'batch') {
      if (currentSelectedRowKeys.length === 0) {
        message.error('please select at least one')
        return
      }

      for (const item of currentSelectedRowKeys) {
        const res = await DeleteEmployee(item)
        if (res === null) {
          message.success('Delete success')
        }
      }

      tableRef.current.reload()
    } else {
      const res = await DeleteEmployee(id)
      if (res === null) {
        message.success('Delete success')
        tableRef.current.reload()
      }
    }
  }

  const getDepartment = async () => {
    let res = await GetDepartmentList()
    let arr = []
    res.forEach(item => {
      arr.push({
        value: item.id,
        label: item.name
      })
    })

    setDepartmentList(arr)
  }

  useEffect(() => {
    getDepartment()
  }, [])

  return (
    <ConfigProvider locale={enUS}>
      <ProTable
        actionRef={tableRef}
        rowSelection={{
          selectedRowKeys: currentSelectedRowKeys,
          onChange: handleSelectChange
        }}
        // request 属性用于配置表格的数据请求和数据加载的方式
        request={async params => {
          const filters = {
            name: params.name,
            gender: params.gender,
            status: params.status
          }

          if (params.entrydate && params.entrydate.length) {
            const time = params.entrydate
            filters.begin = time[0]
            filters.end = time[1]
          }

          const param = {
            page: params.current,
            pageSize: params.pageSize,
            ...filters
          }

          setCurrentPage(params.current)
          setPageSize(params.pageSize)
          const res = await GetEmployeeList(param)
          const { rows, total } = res

          return {
            data: rows,
            success: true,
            total: total
          }
        }}
        params={{
          pageSize: pageSize,
          current: currentPage
        }}
        rowKey='id'
        columns={originColumns}
        headerTitle={
          <>
            <Button
              icon={<PlusOutlined />}
              onClick={() => handleAddAndEdit('Add')}
              key={Math.random().toString()}
              type='primary'
              style={{ marginRight: '10px' }}
            >
              Add Employee
            </Button>

            <Popconfirm
              key='delete'
              title='Are you sure to delete？'
              onConfirm={() => handleDelete('batch')}
              okText='Confirm'
              cancelText='Cancel'
            >
              <Button icon={<MinusOutlined />} key={Math.random().toString()} type='primary' danger>
                Batch Delete
              </Button>
            </Popconfirm>
          </>
        }
        search={{
          defaultCollapsed: false,
          labelWidth: 80,
          span: 12
        }}
      />
    </ConfigProvider>
  )
}
