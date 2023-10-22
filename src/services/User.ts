import request from '@/utils/request'

// 获取登录用户信息
export async function fetchUser() {
  return request('/api/user/getLoginUserInfo', {
    method: 'GET'
  })
}

// 登陆
export async function login(data: any) {
  return request('/login', {
    method: 'POST',
    data
  })
}
