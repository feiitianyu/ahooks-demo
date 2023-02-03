import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Drawer, Input, Checkbox, ConfigProvider, message } from 'antd'
import * as request from '../../share/request'
import './index.css'

const Login = () => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  const login = () => {
    request.login({ username, password }).then((data) => {
      
    }).catch(() => {
      message.error('登录失败')
    })
  }

  if (localStorage.getItem('adminToken')) {
    console.log('to admin')
    return <Redirect to='/admin' />
  }

  return (
    <div className='login-page'>
      <Drawer
        autoFocus={false}
        closable={false}
        open={true}
        mask={false}
        bodyStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        width={800}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #E1E1E1', padding: '48px 60px 56px', borderRadius: 8 }}>
          <div style={{ fontSize: 40, fontWeight: 600 }}>管理后台登录</div>
          <div style={{ fontSize: 14, margin: '2px 0 32px', color: '#A1A1A1' }}>通过手机号密码登录</div>
          <Input placeholder='用户名' style={{ width: 280, height: 58, fontSize: 16 }} onChange={(e) => setUsername(e.target.value)} />
          <Input placeholder='密码' style={{ width: 280, height: 58, margin: '24px 0 8px', fontSize: 16 }} onChange={(e) => setPassword(e.target.value)} type='password' />
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex' }}>
              <ConfigProvider theme={{ token: { colorPrimary: '#383838' } }}>
                <Checkbox />
              </ConfigProvider>
              <div style={{ marginLeft: 6, color: '#A1A1A1' }}>记住密码</div>
            </div>
            <div style={{ color: '#A1A1A1' }}>忘记密码</div>
          </div>
          <Button
            style={{ width: 88, height: 40, backgroundColor: '#383838', color: 'white', alignSelf: 'flex-end', marginTop: 26 }}
            onClick={login}
          >
            下一步
          </Button>
        </div>
      </Drawer>
    </div>
  )
}

export default Login
