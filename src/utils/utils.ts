export function trim(str: string) {
  return str.trim()
}

export function getAccessToken() {
  const key = 'token'
  return sessionStorage.getItem(key) || localStorage.getItem(key) || getCookie(key)
}

export function setAccessToken(value: string, lasting: boolean) {
  const key = 'token'
  sessionStorage.setItem(key, value)
  localStorage.setItem(key, value)
  setCookie(key, value, getDomain(), lasting)
}

export function clearAccessToken() {
  clearStorage()
  const domain = getDomain()
  const key = 'token'
  document.cookie = key + '=0;expires=' + new Date(0).toUTCString()
  document.cookie = key + '=0;domain=' + domain + ';expires=' + new Date(0).toUTCString()
  document.cookie = key + '=0;path=/;domain=' + domain + ';expires=' + new Date(0).toUTCString()
}

export function getCookie(name: string) {
  const cookies = document.cookie
  if (cookies) {
    const cookieObj: any = {}
    cookies.split(';').forEach(item => {
      const [key, value] = item.split('=')
      cookieObj[trim(key)] = trim(value)
    })

    if (cookieObj[name]) {
      return cookieObj[name]
    } else {
      return ''
    }
  } else {
    return ''
  }
}

export function CheckOptionAuth(routeList: any[], authList: string[]) {
  const resList: any[] = []
  routeList.forEach(route => {
    if (!route.auth || authList.includes(route.auth)) {
      const routeItem = { ...route }
      if (route.routes && route.routes.length) {
        routeItem.routes = CheckOptionAuth(route.routes, authList)
      }

      resList.push(routeItem)
    }
  })

  return resList
}

export function findPath(path: string, routes: any[], authList: string[]): any {
  let res = null

  routes.forEach(item => {
    if (item.path === path) {
      res = item
    } else {
      if (item.routes) {
        const tempRes = findPath(path, item.routes, authList)
        if (tempRes) {
          res = tempRes
        }
      }
    }
  })

  return res
}

export const getDomain = () => {
  let domain = window.location.hostname
  const domainList = window.location.hostname.split('.')
  if (domainList.length > 2) {
    domain = domainList.splice(1).join('.')
  }
  return domain
}

export const clearCookie = () => {
  const oKeys = document.cookie.match(/[^=;]+(?=\=)/g)
  const keys = oKeys ? oKeys.map(i => trim(i)) : []
  if (keys) {
    const domain = getDomain()
    keys.forEach(key => {
      document.cookie = key + '=0;expires=' + new Date(0).toUTCString()
      document.cookie = key + '=0;domain=' + domain + ';expires=' + new Date(0).toUTCString()
      document.cookie = key + '=0;path=/;domain=' + domain + ';expires=' + new Date(0).toUTCString()
    })
  }
}

export const clearStorage = () => {
  localStorage.clear()
  sessionStorage.clear()
}

export const clearLogin = () => {
  clearStorage()
  clearCookie()
}

export const setCookie = (name: string, value: string, domain: string, keep?: boolean) => {
  let cookie_string = name + '=' + value

  if (keep) {
    const now = new Date()
    now.setFullYear(now.getFullYear() + 1)
    const expires = now.toUTCString()

    cookie_string += '; expires=' + expires
  }

  cookie_string += '; path=/'

  if (domain) cookie_string += '; domain=' + domain
  document.cookie = cookie_string
}
