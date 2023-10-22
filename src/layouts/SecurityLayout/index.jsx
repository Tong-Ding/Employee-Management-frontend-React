import { history, useModel } from '@umijs/max'
import { useEffect, useState } from 'react'
import { PageLoading } from '@ant-design/pro-components'
import BasicLayout from '../BasicLayout'
import { clearCookie } from '@/utils/utils'
import router from '../../../config/router'

const SecurityLayout = () => {
  const { FetchUser, routerList, setRouterList, setUserInfo, CheckUser } = useModel('Global')
  const [isLogin, setIsLogin] = useState(false)

  const fetchUser = () => {
    setRouterList(router[0].routes)
    setUserInfo({
      username: 'admin',
      uid: '1'
    })
    setIsLogin(true)
  }

  const goLogin = () => {
    clearCookie()
    const path = window.location.pathname
    const target = path ? `login?target=${path}` : '/login'
    history.push(target)
  }

  const checkUser = () => {
    CheckUser().then(
      res => {
        if (res) {
          fetchUser()
        } else {
          goLogin()
        }
      },
      err => {
        goLogin()
      }
    )
  }

  useEffect(() => {
    checkUser()
  }, [])

  return isLogin ? <BasicLayout authRoute={routerList} /> : <PageLoading />
}

export default SecurityLayout
