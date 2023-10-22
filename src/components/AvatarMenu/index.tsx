import React, { useState } from 'react'
import './index.less'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Dropdown, Avatar } from 'antd'
import { history, useModel } from '@umijs/max'
import { clearLogin } from '@/utils/utils'

const AvatarMenu = () => {
  const { userInfo } = useModel('Global')
  // 一种显式类型注解的方式
  const [items, setItems] = useState<MenuProps['items']>([
    {
      label: 'exit',
      key: 'exit',
      icon: <LogoutOutlined />
    }
  ])

  const handleExitUserLogin = () => {
    clearLogin()
    history.replace('/login')
  }

  interface IkeyMap {
    // 最外层的方括号 [] 表示这是一个索引签名
    [key: string]: () => void
  }

  const keyMap: IkeyMap = {
    exit: () => handleExitUserLogin()
  }

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    keyMap[key]()
  }

  const menuProps = {
    items,
    onClick: handleMenuClick
  }

  return (
    <Dropdown menu={menuProps} trigger={['click']}>
      <div className={'box'}>
        <span>{userInfo.username}</span>
        <Avatar size='small' icon={<UserOutlined />} />
      </div>
    </Dropdown>
  )
}

export default AvatarMenu
