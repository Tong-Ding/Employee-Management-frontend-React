import { defineConfig } from '@umijs/max'
import routes from './router'

const baseUrl = '/api'

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  dva: {},
  mfsu: {},
  routes,
  favicons: ['https://blzjimg.0123china.cn/202310172255084.png'],
  manifest: { basePath: '/' },
  base: '/',
  publicPath: '/',
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      ws: false,
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  },
  npmClient: 'pnpm',
  define: {
    'process.env': {
      NODE_ENV: process.env.NODE_ENV,
      PLATFORM: process.env.UMI_ENV,
      LOGO: 'https://blzjimg.0123china.cn/202310172255084.png',
      BASE_URL: baseUrl,
      PLATFORM_NAME: 'Management'
    }
  },
  outputPath: 'dist',
  // 清除缓存机制
  metas: [
    {
      httpEquiv: 'Cache-Control',
      content: 'no-cache'
    },
    {
      httpEquiv: 'Pragma',
      content: 'no-cache'
    },
    {
      httpEquiv: 'Expires',
      content: '0'
    }
  ],
  hash: true // 打包文件加hash
})
