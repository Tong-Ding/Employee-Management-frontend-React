import styles from './index.less'
import { DEFAULT_NAME } from '@/constants'
import { useModel, useSearchParams, history } from '@umijs/max'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components'
import { App } from 'antd'
import { setCookie, getDomain, setAccessToken } from '@/utils/utils'

const Login = () => {
  const { message } = App.useApp()
  const { Login } = useModel('Global')
  const [searchParams] = useSearchParams()

  const handleSubmit = (values: any) => {
    const { autoLogin } = values

    Login(values).then((res: any) => {
      if (res) {
        const target = searchParams.get('target') || '/'
        message.success('login success')

        setAccessToken(res, autoLogin)
        setCookie('autoL', res, getDomain(), autoLogin)

        history.push(target || '/')
      }
    })
  }

  return (
    <div className={styles.login_content}>
      <LoginForm
        title={`${DEFAULT_NAME}`}
        subTitle=' '
        initialValues={{
          autoLogin: true
        }}
        onFinish={async values => {
          handleSubmit(values)
        }}
        className={styles.login_form_block}
        // 使用 submitter 属性自定义按钮文本
        submitter={{
          searchConfig: {
            submitText: 'Login' // 按钮文本更改为 "Login"
          }
        }}
      >
        <ProFormText
          name='username'
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={'prefixIcon'} />
          }}
          placeholder={'admin'}
          rules={[
            {
              required: true,
              message: 'Please enter a user name!'
            }
          ]}
        />
        <ProFormText.Password
          name='password'
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={'prefixIcon'} />
          }}
          placeholder={'ant.design'}
          rules={[
            {
              required: true,
              message: 'Please enter the password！'
            }
          ]}
        />

        <div style={{ marginBlockEnd: 24 }}>
          <ProFormCheckbox noStyle name='autoLogin'>
            Automatic Login
          </ProFormCheckbox>
          <a style={{ float: 'right' }}>Forgot Password</a>
        </div>
      </LoginForm>
    </div>
  )
}

export default Login
