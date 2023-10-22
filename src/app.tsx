// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
import type { RequestConfig } from '@umijs/max'
import { notification } from '@/utils/AntdGlobal'
import { history } from '@umijs/max'
import './app.less'
import '../public/iconfont.css'

export const request: RequestConfig = {
  timeout: 10000,
  baseURL: process.env.BASE_URL,
  // credentials: 'include',
  headers: {
    token: localStorage.getItem('token') || sessionStorage.getItem('token') || ''
  },

  // other axios options you want
  errorConfig: {
    errorHandler(err) {
      console.log('errorHandler', err)
      notification.error({
        message: `request error`,
        //@ts-ignore
        description: err.response.data.msg
      })
    },
    errorThrower(err) {
      console.log('errorThrower', err)
    }
  },
  requestInterceptors: [],
  responseInterceptors: [
    (response: any) => {
      // 不再需要异步处理读取返回体内容，可直接在data中读出，部分字段可在 config 中找到
      // 两次解构赋值，如果 data 属性不存在或为空（undefined 或 null），则会将一个空对象作为默认值。as any 是类型断言，将默认值的类型断言为 any 类型
      const { data: { code, data, msg } = {} as any } = response
      if (code === 1) {
        return {
          ...response,
          data
        }
      } else {
        if (msg === 'NOT_LOGIN') {
          const path = window.location.pathname // 返回的是当前页面的路径部分，不包括主机名、协议和查询参数
          const target = path ? `/main/login?target=${path}` : '/main/login'
          history.push(target)
          return false
        } else {
          notification.warning({
            message: `request error`,
            description: msg
          })
          return false
        }
      }
    }
  ]
}
