import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'

// API 响应数据结构
export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}

// 请求配置接口
export interface RequestConfig extends AxiosRequestConfig {
  showLoading?: boolean
  showError?: boolean
}

class Request {
  private instance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    // 创建 axios 实例
    this.instance = axios.create(config)

    // 设置请求拦截器
    this.setupRequestInterceptors()

    // 设置响应拦截器
    this.setupResponseInterceptors()
  }

  /**
   * 设置请求拦截器
   */
  private setupRequestInterceptors(): void {
    this.instance.interceptors.request.use(
      (config) => {
        // 在发送请求之前做些什么
        console.log('🚀 Request:', config.method?.toUpperCase(), config.url)

        // 添加 token 到请求头
        const token = localStorage.getItem('token')
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }

        // 添加时间戳防止缓存
        if (config.method === 'get') {
          config.params = {
            ...config.params,
            _t: Date.now()
          }
        }

        return config
      },
      (error) => {
        // 对请求错误做些什么
        console.error('❌ Request Error:', error)
        return Promise.reject(error)
      }
    )
  }

  /**
   * 设置响应拦截器
   */
  private setupResponseInterceptors(): void {
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        // 2xx 范围内的状态码都会触发该函数
        console.log('✅ Response:', response.status, response.config.url)

        const { data } = response

        // 如果返回的数据不是标准的 ApiResponse 格式，直接返回
        if (!data || typeof data.code === 'undefined') {
          return response
        }

        // 根据业务状态码处理
        if (data.code === 200) {
          return response
        } else if (data.code === 401) {
          // token 过期，清除本地存储并跳转到登录页
          localStorage.removeItem('token')
          window.location.href = '/login'
          return Promise.reject(new Error('登录已过期，请重新登录'))
        } else {
          // 其他业务错误
          const errorMessage = data.message || '请求失败'
          console.error('❌ Business Error:', errorMessage)
          return Promise.reject(new Error(errorMessage))
        }
      },
      (error) => {
        // 超出 2xx 范围的状态码都会触发该函数
        console.error('❌ Response Error:', error)

        let errorMessage = '网络错误，请稍后重试'

        if (error.response) {
          // 服务器响应了错误状态码
          const { status, data } = error.response
          switch (status) {
            case 400:
              errorMessage = data?.message || '请求参数错误'
              break
            case 401:
              errorMessage = '未授权，请登录'
              localStorage.removeItem('token')
              window.location.href = '/login'
              break
            case 403:
              errorMessage = '拒绝访问'
              break
            case 404:
              errorMessage = '请求地址不存在'
              break
            case 500:
              errorMessage = '服务器内部错误'
              break
            default:
              errorMessage = data?.message || `请求失败 (${status})`
          }
        } else if (error.request) {
          // 请求已发出但没有收到响应
          errorMessage = '网络连接超时，请检查网络'
        }

        return Promise.reject(new Error(errorMessage))
      }
    )
  }

  /**
   * GET 请求
   */
  async get<T = unknown>(url: string, config?: RequestConfig): Promise<T> {
    const response = await this.instance.get<ApiResponse<T>>(url, config)
    return response.data.data
  }

  /**
   * POST 请求
   */
  async post<T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    const response = await this.instance.post<ApiResponse<T>>(url, data, config)
    return response.data.data
  }

  /**
   * PUT 请求
   */
  async put<T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    const response = await this.instance.put<ApiResponse<T>>(url, data, config)
    return response.data.data
  }

  /**
   * DELETE 请求
   */
  async delete<T = unknown>(url: string, config?: RequestConfig): Promise<T> {
    const response = await this.instance.delete<ApiResponse<T>>(url, config)
    return response.data.data
  }

  /**
   * PATCH 请求
   */
  async patch<T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    const response = await this.instance.patch<ApiResponse<T>>(url, data, config)
    return response.data.data
  }

  /**
   * 通用请求方法
   */
  async request<T = unknown>(config: RequestConfig): Promise<T> {
    const response = await this.instance.request<ApiResponse<T>>(config)
    return response.data.data
  }

  /**
   * 获取原始响应（包含完整的 response 对象）
   */
  async getRawResponse<T = unknown>(url: string, config?: RequestConfig): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.instance.get<ApiResponse<T>>(url, config)
  }
}

// 创建默认实例
const request = new Request({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default request
