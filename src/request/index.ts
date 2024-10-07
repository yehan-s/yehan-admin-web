import loginService from '@/pages/login/service'
import { toLoginPage } from '@/router'
import { useGlobalStore } from '@/stores/global'
import { antdUtils } from '@/utils/antd'
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios'

export type Response<T> = Promise<[boolean, T, AxiosResponse<T>]>

class Request {
  constructor(config?: CreateAxiosDefaults) {
    this.axiosInstance = axios.create(config)

    this.axiosInstance.interceptors.request.use((axiosConfig) => this.requestInterceptor(axiosConfig))

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse<unknown, unknown>) => this.responseSuccessInterceptor(response),
      (error: any) => this.responseErrorInterceptor(error)
    )
  }

  private axiosInstance: AxiosInstance
  private refeshTokenFlag = false
  private requestQueue: { resolve: any; config: any; type: 'request' | 'response' }[] = []

  // 请求拦截器
  private requestInterceptor(axiosConfig: InternalAxiosRequestConfig) {
    // 如果在刷新token，则把接口插入队列，等待刷新token完成后再发请求
    if (this.refeshTokenFlag) {
      return new Promise((resolve) => {
        this.requestQueue.push({ resolve, config: axiosConfig, type: 'request' })
      })
    }

    const { token } = useGlobalStore.getState()
    if (token) {
      axiosConfig.headers.Authorization = `Bearer ${token}`
    }

    return Promise.resolve(axiosConfig)
  }

  // 响应成功拦截器
  private responseSuccessInterceptor(response: AxiosResponse<any, any>): Promise<any> {
    return Promise.resolve([false, response.data, response])
  }

  // 响应错误拦截器
  private responseErrorInterceptor(error: any): Promise<any> {
    const { status, config } = error.response || {}
    // 如果是401，则把接口插入队列，等待刷新token
    if (status === 401) {
      // 刷新token
      return new Promise((resolve) => {
        this.requestQueue.push({ resolve, config, type: 'response' })
        if (!this.refeshTokenFlag) {
          this.refeshToken()
        }
      })
    } else {
      antdUtils.notification?.error({
        message: '出错了',
        description: error?.response?.data?.message,
      })
    }
    return Promise.resolve([true, error, error.response])
  }

  // 刷新token
  private async refeshToken() {
    // 先修改标志
    this.refeshTokenFlag = true
    const { refreshToken, setToken, setRefreshToken } = useGlobalStore.getState()

    // 如果没有refreshToken，则跳回登录
    if (!refreshToken) {
      toLoginPage()
    }

    // 调刷新接口
    const [error, data] = await loginService.refreshToken(refreshToken)

    // 如果刷新失败，则跳回登录
    if (error) {
      toLoginPage()
    }

    // 刷新成功，设置token和refreshToken
    setToken(data.token)
    setRefreshToken(data.refreshToken)
    this.refeshTokenFlag = false

    // 处理队列 不能使用for，因为里面有await，使用for会让回调函数同步执行
    Array.from({ length: this.requestQueue.length }).forEach(async () => {
      const request = this.requestQueue.shift()
      if (request) {
        const { resolve, config, type } = request

        // 如果响应是401，取到config直接再发一次请求
        if (type === 'response') {
          resolve(await this.request(config))
        } else if (type === 'request') {
          // 如果被请求拦截器拦截，则更换token后再发一次请求
          config.headers.Authorization = `Bearer ${data.token}`
          resolve(await this.request(config))
        }
      }
    })
  }

  request<T, D = any>(config: AxiosRequestConfig<D>): Response<T> {
    return this.axiosInstance(config)
  }

  get<T, D = any>(url: string, config?: AxiosRequestConfig<D>): Response<T> {
    return this.axiosInstance.get(url, config)
  }

  post<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Response<T> {
    return this.axiosInstance.post(url, data, config)
  }

  put<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Response<T> {
    return this.axiosInstance.put(url, data, config)
  }

  delete<T, D = any>(url: string, config?: AxiosRequestConfig<D>): Response<T> {
    return this.axiosInstance.delete(url, config)
  }
}

const request = new Request({ timeout: 10000 })

export default request
