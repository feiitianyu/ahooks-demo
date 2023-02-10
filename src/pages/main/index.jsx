import { Switch, Route, Redirect } from 'react-router-dom'
import { Avatar, Menu } from 'antd'
import { MobileOutlined, BarChartOutlined, SettingOutlined } from '@ant-design/icons'
import Scene from '../scene'

const Main = () => {
  return (
    <div className="admin-page">
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', height: 64, backgroundColor: '#F2F3F5', alignItems: 'center', padding: '0 24px' }}>
        <div>
          <span style={{ marginRight: 8 }}>MEETINGPAD</span>
          <span>管理后台</span>
        </div>
        <Avatar src='https://img.js.design/assets/smartFill/img324164da746310.jpg' />
      </div>
      <Menu
        items={[
          // { label: '移动端注册', key: '/admin/mobileRegistration', icon: <MobileOutlined /> },
          // { label: '数据统计', key: '/admin/dataStatistics', icon: <BarChartOutlined /> },
          // { label: '系统配置', key: '/admin/systemConfig', icon: <SettingOutlined /> },
          { label: 'scene', key: '/admin/scene', icon: <MobileOutlined /> }
        ]}
        mode='vertical'
        style={{ backgroundColor: '#F2F3F5', width: 240, position: 'fixed', top: 64, left: 0, bottom: 0 }}
      />
      <div style={{ position: 'fixed', left: 240, top: 64, right: 0, bottom: 0 }}>
        <Switch>
          <Route path='/admin/scene' component={Scene} />
          <Redirect to='/admin/scene' />
        </Switch>
      </div>
    </div>
  )
}

export default Main
