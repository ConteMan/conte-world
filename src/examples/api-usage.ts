// API 使用示例

import { userApi, articleApi, type User, type Article } from '@/api'

/**
 * 用户相关 API 使用示例
 */
export class UserService {
  /**
   * 用户登录示例
   */
  static async login(username: string, password: string) {
    try {
      const response = await userApi.login({ username, password })
      
      // 保存 token 到本地存储
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      
      return response
    } catch (error) {
      console.error('登录失败:', error)
      throw error
    }
  }

  /**
   * 获取用户信息示例
   */
  static async getUserProfile(): Promise<User | null> {
    try {
      const user = await userApi.getCurrentUser()
      return user
    } catch (error) {
      console.error('获取用户信息失败:', error)
      return null
    }
  }

  /**
   * 更新用户信息示例
   */
  static async updateProfile(userData: Partial<User>) {
    try {
      const updatedUser = await userApi.updateProfile(userData)
      
      // 更新本地存储的用户信息
      localStorage.setItem('user', JSON.stringify(updatedUser))
      
      return updatedUser
    } catch (error) {
      console.error('更新用户信息失败:', error)
      throw error
    }
  }

  /**
   * 用户登出示例
   */
  static async logout() {
    try {
      await userApi.logout()
      
      // 清除本地存储
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      
      // 重定向到登录页
      window.location.href = '/login'
    } catch (error) {
      console.error('登出失败:', error)
      // 即使登出失败也清除本地数据
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }
}

/**
 * 文章相关 API 使用示例
 */
export class ArticleService {
  /**
   * 获取文章列表示例
   */
  static async getArticles(params: {
    page?: number
    pageSize?: number
    keyword?: string
    categoryId?: number
  } = {}) {
    try {
      const { page = 1, pageSize = 10, ...otherParams } = params
      
      const response = await articleApi.getArticleList({
        page,
        pageSize,
        ...otherParams
      })
      
      return response
    } catch (error) {
      console.error('获取文章列表失败:', error)
      throw error
    }
  }

  /**
   * 获取文章详情示例
   */
  static async getArticleDetail(id: number): Promise<Article | null> {
    try {
      const article = await articleApi.getArticleById(id)
      return article
    } catch (error) {
      console.error('获取文章详情失败:', error)
      return null
    }
  }

  /**
   * 创建文章示例
   */
  static async createArticle(articleData: {
    title: string
    content: string
    summary?: string
    tags?: string[]
    categoryId?: number
  }) {
    try {
      const article = await articleApi.createArticle(articleData)
      console.log('文章创建成功:', article)
      return article
    } catch (error) {
      console.error('创建文章失败:', error)
      throw error
    }
  }

  /**
   * 点赞文章示例
   */
  static async likeArticle(id: number) {
    try {
      await articleApi.likeArticle(id)
      console.log('点赞成功')
    } catch (error) {
      console.error('点赞失败:', error)
      throw error
    }
  }
}

/**
 * 错误处理示例
 */
export class ErrorHandler {
  /**
   * 统一错误处理
   */
  static handleApiError(error: unknown) {
    if (error && typeof error === 'object' && 'response' in error) {
      const apiError = error as { response: { data: API.ErrorResponse } }
      const { code, message } = apiError.response.data
      
      switch (code) {
        case 401:
          console.error('未授权，请重新登录')
          UserService.logout()
          break
        case 403:
          console.error('权限不足')
          break
        case 404:
          console.error('资源不存在')
          break
        case 500:
          console.error('服务器错误')
          break
        default:
          console.error('请求失败:', message)
      }
    } else {
      console.error('未知错误:', error)
    }
  }
}

/**
 * 在 Vue 组件中使用示例
 */
export const useApiExample = () => {
  // 在 setup 函数中使用
  const handleLogin = async (username: string, password: string) => {
    try {
      const result = await UserService.login(username, password)
      console.log('登录成功:', result)
    } catch (error) {
      ErrorHandler.handleApiError(error)
    }
  }

  const handleGetArticles = async () => {
    try {
      const result = await ArticleService.getArticles({
        page: 1,
        pageSize: 10,
        keyword: 'Vue'
      })
      console.log('文章列表:', result)
    } catch (error) {
      ErrorHandler.handleApiError(error)
    }
  }

  return {
    handleLogin,
    handleGetArticles
  }
}