import { request } from '@umijs/max'
import { getAccessToken } from './utils'

export default (url: string, config: any) => {
  const { method, data, params } = config
  if (method === 'GET') {
    config.params = data || params
  }

  return request(url, {
    ...config,
    headers: {
      token: getAccessToken()
    }
  })
}
