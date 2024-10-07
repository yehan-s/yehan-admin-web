import axios from 'axios'

export interface Menu {
  id: string
  parentId?: string
  name?: string
  icon?: string
  type?: number
  route?: string
  filePath?: string
  orderNumber?: number
  url?: string
  show?: boolean
  children?: Menu[]
  path: string
  Component?: any
  parentPaths?: string[]
  authCode: string
}

export interface User {
  id: number
  userName: string
  nickName: string
  phoneNumber: string
  email: string
  createDate: string
  updateDate: string
  avatar?: string
}

export interface pageData {
  data: User[]
  total: number
}

const userService = {
  // 分页获取用户列表
  getUserListByPage: ({ current, pageSize }: { current: number; pageSize: number }, forData: any) => {
    return axios
      .get<pageData>('/api/user/page', {
        params: {
          page: current - 1,
          size: pageSize,
          ...forData,
        },
      })
      .then(({ data }) => {
        return {
          list: data.data,
          total: data.total,
        }
      })
  },
  // 添加用户
  addUser: (data: User) => {
    return axios.post('/api/user', data)
  },
  // 更新用户
  updateUser: (data: User) => {
    return axios.patch('/api/user', data)
  },
  // 删除用户
  deleteUser: (id: number) => {
    return axios.delete('/api/user/' + id)
  },

  // 验证码
  getCaptcha: () => {
    return axios.get('/api/auth/captcha')
  },
  //获取当前用户信息
  getUserInfo: () => {
    return axios.get<User>('/api/auth/current/user')
  },
}

export default userService
