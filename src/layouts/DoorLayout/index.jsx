import { Outlet } from 'umi'
import styles from './index.less'
import { App as AntdApp } from 'antd'
import AntdGlobal from '@/utils/AntdGlobal'
export default props => {
  return (
    <div className={styles.door_wrapper}>
      <div className={styles.inner_wrapper}>
        <AntdApp>
          <AntdGlobal />
          <Outlet />
        </AntdApp>
      </div>
    </div>
  )
}
