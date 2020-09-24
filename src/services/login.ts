import request from '@/utils/request'

// 登录
const login = (param: object) =>
  request(`/auth/user/login`, {
    method: 'post',
    body: param
  })

// 获取登录令牌
const getJwt = () => request(`/auth/user/jwt`)

// 退出登录
const loginOut = () =>
  request(`/auth/user/logout`, {
    method: 'post'
  })

export { login, getJwt, loginOut }
