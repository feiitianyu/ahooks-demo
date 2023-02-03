import axios from "axios"
const md5 = require('md5')

const client = axios.create({
  baseURL: `${window.location.origin}/api/v1`
})

client.interceptors.request.use((config) => {
  if (localStorage.getItem('adminToken')) {
    return { ...config, headers: { ...config.headers, Authorization: `Bearer ${localStorage.getItem('adminToken')}` } }
  }
  return config
})

client.interceptors.response.use((response) => {
  if (response.headers.token) {
    if (response.config.url !== '/admin/pwd/codeVerify' && response.config.url !== '/admin/pwd/reset') {
      localStorage.setItem('adminToken', response.headers.token)
    } else {
      if (response.config.url === '/admin/pwd/codeVerify') {
        localStorage.setItem('resetToken', response.headers.token)
      }
    }
  }
  return response.data
})

export const login = ({ username, password }) => client.post('/admin/login', { username, password: md5(password) })

export const getDevices = (params) => client.get('/devices', { params })
