// 全局共享数据示例
import { DEFAULT_NAME, UPLOAD_URL, CERT_UPLOAD_URL } from '@/constants'
import { useState } from 'react'
import { login, fetchUser } from '@/services/User'
import { getAccessToken } from '@/utils/utils'

interface loginParams {
  username: string
  password: string
}

export default () => {
  // ! 表示这个值不会为 null 或 undefined
  const [name, setName] = useState<string>(DEFAULT_NAME!)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [routerList, setRouterList] = useState<any>()
  const [userInfo, setUserInfo] = useState<any>({})
  const [authList, setAuthList] = useState<any>([]) // 身份列表
  const [contentWidth, setContentWidth] = useState<number>(800)

  const Login = (data: loginParams) => {
    return login(data)
  }

  const CheckUser = () => {
    return new Promise((resolve, reject) => {
      const token = getAccessToken()
      if (token) {
        resolve(true)
      } else {
        reject(false)
      }
    })
  }

  const FetchUser = () => {
    return new Promise((resolve, reject) => {
      fetchUser().then(
        res => {
          resolve(res)
        },
        err => {
          reject(false)
        }
      )
    })
  }

  // 检查操作权限
  const CheckOptionAuth = (key: string) => {
    // 使用 !! 运算符将返回值转换为布尔值。如果找到匹配的权限，则返回 true；否则，返回 false。
    return !!authList.find((i: any) => i.action === key)
  }

  return {
    name,
    setName,
    isLoading,
    setIsLoading,
    routerList,
    setRouterList,
    userInfo,
    setUserInfo,
    contentWidth,
    setContentWidth,
    authList,
    setAuthList,

    Login,
    CheckUser,
    FetchUser,
    UPLOAD_URL,
    CERT_UPLOAD_URL,
    CheckOptionAuth
  }
}
