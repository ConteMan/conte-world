// API 相关类型定义

// 重新导出通用类型，方便使用
export type { PaginationResponse } from '@/api/user'

// HTTP 请求方法
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS'

// 请求配置
export interface RequestConfig {
  url?: string
  method?: HttpMethod
  baseURL?: string
  headers?: Record<string, string>
  params?: Record<string, unknown>
  data?: unknown
  timeout?: number
  withCredentials?: boolean
  responseType?: 'json' | 'text' | 'blob' | 'arraybuffer'
}

// 响应数据
export interface ResponseData<T = unknown> {
  code: number
  message: string
  data: T
  success: boolean
  timestamp: number
}

// 错误信息
export interface ApiError {
  code: number
  message: string
  details?: string
  stack?: string
}

// 请求拦截器配置
export interface RequestInterceptorConfig {
  onFulfilled?: (config: RequestConfig) => RequestConfig | Promise<RequestConfig>
  onRejected?: (error: unknown) => unknown
}

// 响应拦截器配置
export interface ResponseInterceptorConfig<T = unknown> {
  onFulfilled?: (response: ResponseData<T>) => ResponseData<T> | T | Promise<ResponseData<T> | T>
  onRejected?: (error: unknown) => unknown
}

// 上传文件参数
export interface UploadFileParams {
  file: File
  filename?: string
  onProgress?: (progress: number) => void
}

// 下载文件参数
export interface DownloadFileParams {
  url: string
  filename?: string
  onProgress?: (progress: number) => void
}

// API 端点配置
export interface ApiEndpoint {
  url: string
  method: HttpMethod
  description?: string
}

// API 模块配置
export interface ApiModule {
  baseURL?: string
  endpoints: Record<string, ApiEndpoint>
}

// 缓存配置
export interface CacheConfig {
  enabled: boolean
  ttl?: number // 缓存时间（毫秒）
  key?: string // 缓存键
}

// 重试配置
export interface RetryConfig {
  enabled: boolean
  times?: number // 重试次数
  delay?: number // 重试延迟（毫秒）
  condition?: (error: ApiError) => boolean // 重试条件
}