import React, { useState, useRef } from 'react'
import { useModel } from '@umijs/max'
import ProTable from '@ant-design/pro-table'
import enUS from 'antd/locale/en_US'
import { ConfigProvider } from 'antd'
import { App, Button, Popconfirm, Form, Input } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

export default () => {
  const { GetDepartmentList, AddDepartment, DeleteDepartment, UpdateDepartment } = useModel('Department')
  const { message, modal } = App.useApp()

  const [pageSize, setPageSize] = useState(10) //  每页数量
  const [currentPage, setCurrentPage] = useState(1) //  当前页码

  const tableRef = useRef()
  const [departmentFormRef] = Form.useForm()

  const handleAddAndEdit = (type, id) => {
    const DepartmentForm = () => {
      return (
        <Form preserve={false} form={departmentFormRef} layout='vertical' name='department'>
          <Form.Item
            name='name'
            label='Department Name : '
            rules={[{ required: true, message: 'Please enter department name' }]}
          >
            <Input placeholder='Please enter department name' allowClear />
          </Form.Item>
        </Form>
      )
    }

    // confirm 方法用于创建一个模态对话框
    modal.confirm({
      title: type + ' Department',
      content: <DepartmentForm />,
      okText: 'confirm',
      maskClosable: true, // 用于控制用户是否可以通过点击模态背景来关闭对话框
      cancelText: 'cancel',
      onOk: async () => {
        await departmentFormRef.validateFields()
        const { name } = departmentFormRef.getFieldsValue()
        if (type === 'Add') {
          const res = await AddDepartment({ name })
          if (res === null) {
            message.success('Add success')
            tableRef.current.reload()
          }
        } else {
          // todo 编辑
        }
      }
    })
  }

  const handleDelete = async id => {
    let res = await DeleteDepartment(id)
    if (res === null) {
      tableRef.current.reload()
      message.success('Delete success')
    }
  }

  const originColumns = [
    {
      title: 'Number',
      dataIndex: 'id',
      width: 60
    },
    {
      title: 'Department Name',
      dataIndex: 'name',
      width: 120
    },
    {
      title: 'Last Operation Time',
      dataIndex: 'updateTime',
      width: 150,
      render: text => {
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
            <Popconfirm
              key='delete'
              title='Are you sure to delete？'
              onConfirm={() => handleDelete(row.id)}
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

  return (
    <ConfigProvider locale={enUS}>
      <ProTable
        actionRef={tableRef}
        // request 属性用于配置表格的数据请求和数据加载的方式
        request={async params => {
          setCurrentPage(params.current)
          setPageSize(params.pageSize)
          const res = await GetDepartmentList()
          return {
            data: res,
            success: true,
            total: res.length
          }
        }}
        params={{
          pageSize: pageSize,
          current: currentPage
        }}
        headerTitle={
          <Button
            icon={<PlusOutlined />}
            onClick={() => handleAddAndEdit('Add')}
            key={Math.random().toString()}
            type='primary'
          >
            Add Department
          </Button>
        }
        rowKey='id'
        columns={originColumns}
        search={false}
      />
    </ConfigProvider>
  )
}
