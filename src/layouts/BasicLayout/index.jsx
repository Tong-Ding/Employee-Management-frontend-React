import { useOutlet, useModel, Link, useLocation } from 'umi'
import { useEffect, useState } from 'react'
import { ProLayout } from '@ant-design/pro-components'
import { Spin, ConfigProvider, App as AntdApp } from 'antd'
import AvatarMenu from '@/components/AvatarMenu'
import styles from './index.less'
import { DEFAULT_LOGO, DEFAULT_NAME } from '@/constants'
import enUS from 'antd/locale/en_US'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import AntdGlobal from '@/utils/AntdGlobal'

const settings = {
  layout: 'mix'
}

const BasicLayout = props => {
  const authRoute = props.authRoute
    ? props.authRoute.map(i => {
        if (!i.path) {
          i.path = '/'
        }
        return i
      })
    : []
  const location = useLocation()
  const { isLoading, setContentWidth } = useModel('Global')
  const [sysName, setSysName] = useState(DEFAULT_NAME)
  const [collapsed, setCollapsed] = useState(false)
  const currentOutlet = useOutlet()

  useEffect(() => {
    window.addEventListener('resize', e => {
      calcContentWidth()
    })

    // 判断可视范围
    if (document.body.clientWidth >= 990) {
      setCollapsed(false)
    } else {
      setCollapsed(true)
    }
  }, [])

  useEffect(() => {
    calcContentWidth()
  }, [location.pathname])

  const handleCoolapse = () => {
    setTimeout(() => {
      calcContentWidth()
      setCollapsed(!collapsed)
    }, 200)
  }

  const calcContentWidth = () => {
    const ele = document.getElementsByClassName('ant-layout-content')[0]
    if (ele) {
      const clientWidth = ele.getBoundingClientRect().width
      setContentWidth(clientWidth)
    }
  }

  return (
    <ProLayout
      token={{
        header: {
          colorBgHeader: '#fff',
          colorTextMenuSecondary: '#dfdfdf',
          colorTextMenuSelected: '#fff',
          colorBgMenuItemSelected: '#F2F3F4',
          colorTextRightActionsItem: '#dfdfdf'
        },
        sider: {
          colorMenuBackground: '#fff',
          colorMenuItemDivider: '#dfdfdf',
          colorTextMenu: '#595959',
          colorTextMenuSelected: 'rgba(42,122,251,1)',
          colorBgMenuItemSelected: 'rgba(230,243,254,1)'
        }
      }}
      logo={() => (
        <div style={{ marginTop: '10px' }}>
          <img src={DEFAULT_LOGO} alt='logo' />
        </div>
      )}
      title={sysName}
      contentStyle={{ padding: 0 }}
      onCollapse={handleCoolapse}
      menuDataRender={() => authRoute}
      subMenuItemRender={(menu, dom) => {
        return !collapsed ? (
          <div className={styles.menuItem}>
            <svg className={styles.icon} aria-hidden='true'>
              <use xlinkHref={menu.icon_}></use>
            </svg>
            {dom}
          </div>
        ) : (
          <div className={styles.menuCollapsedIcon}>
            <svg className={styles.icon} aria-hidden='true'>
              <use xlinkHref={menu.icon_}></use>
            </svg>
          </div>
        )
      }}
      menuItemRender={(menu, dom) => {
        return (
          <Link to={menu.path}>
            <div className={styles.menuItem}>
              <svg className={styles.icon} aria-hidden='true'>
                <use xlinkHref={menu.icon_}></use>
              </svg>
              {dom}
            </div>
          </Link>
        )
      }}
      actionsRender={props => {
        if (props.isMobile) return []
        return [<AvatarMenu key='AvatarMenu' />]
      }}
      {...settings}
    >
      <SwitchTransition>
        <CSSTransition timeout={200} classNames='pages-main' key={location.pathname}>
          <ConfigProvider locale={enUS}>
            <div className={styles.pageContainer}>
              <Spin tip='Loading...' spinning={isLoading}>
                <AntdApp>
                  <AntdGlobal />
                  {currentOutlet}
                </AntdApp>
              </Spin>
            </div>
          </ConfigProvider>
        </CSSTransition>
      </SwitchTransition>
    </ProLayout>
  )
}

export default BasicLayout
