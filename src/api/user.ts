import request from '@/utils/request'

// 用户信息接口
export interface User {
  id: number
  username: string
  email: string
  avatar?: string
  nickname?: string
  createdAt: string
  updatedAt: string
}

// 登录请求参数
export interface LoginParams {
  username: string
  password: string
}

// 登录响应数据
export interface LoginResponse {
  token: string
  user: User
}

// 注册请求参数
export interface RegisterParams {
  username: string
  email: string
  password: string
  confirmPassword: string
}

// 用户列表查询参数
export interface UserListParams {
  page?: number
  pageSize?: number
  keyword?: string
}

// 分页响应数据
export interface PaginationResponse<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

/**
 * 用户 API 服务
 */
export const userApi = {
  /**
   * 用户登录
   */
  login(params: LoginParams): Promise<LoginResponse> {
    return request.post<LoginResponse>('/auth/login', params)
  },

  /**
   * 用户注册
   */
  register(params: RegisterParams): Promise<User> {
    return request.post<User>('/auth/register', params)
  },

  /**
   * 获取当前用户信息
   */
  getCurrentUser(): Promise<User> {
    return request.get<User>('/user/profile')
  },

  /**
   * 更新用户信息
   */
  updateProfile(params: Partial<User>): Promise<User> {
    return request.put<User>('/user/profile', params)
  },

  /**
   * 修改密码
   */
  changePassword(params: { oldPassword: string; newPassword: string }): Promise<void> {
    return request.post<void>('/user/change-password', params)
  },

  /**
   * 获取用户列表
   */
  getUserList(params: UserListParams): Promise<PaginationResponse<User>> {
    return request.get<PaginationResponse<User>>('/users', { params })
  },

  /**
   * 根据 ID 获取用户信息
   */
  getUserById(id: number): Promise<User> {
    return request.get<User>(`/users/${id}`)
  },

  /**
   * 删除用户
   */
  deleteUser(id: number): Promise<void> {
    return request.delete<void>(`/users/${id}`)
  },

  /**
   * 用户登出
   */
  logout(): Promise<void> {
    return request.post<void>('/auth/logout')
  }
}