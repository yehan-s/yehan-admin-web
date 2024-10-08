import axios from 'axios'

export interface LoginDTO {
  accountNumber: string
  password: string
  captchaId: string
  captcha: string
  publicKey: string
}

export interface TokenDTO {
  expire: number
  token: string
  refreshExpire: number
  refreshToken: string
}

export interface captchaDTO {
  id: string
  data: string
  time: Date
}

const loginService = {
  // 登录
  login: (loginDto: LoginDTO) => {
    return axios.post<TokenDTO>('/api/auth/login', loginDto)
  },

  // 获取验证码
  getCaptcha: () => {
    return axios.get<captchaDTO>('/api/auth/captcha')
  },

  // 获取公钥
  getPublicKey: () => {
    return axios.get<string>('/api/auth/publicKey')
  },

  //刷新token
  rerefshToken(refreshToken: string) {
    return axios.post<TokenDTO>('/api/auth/refresh/token', { refreshToken })
  },

  //退出登录
  logout() {
    return axios.post<TokenDTO>('api/auth/logout')
  },
}

export default loginService
