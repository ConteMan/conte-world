import request from '@/utils/request'
import type { PaginationResponse } from './user'

// 文章接口
export interface Article {
  id: number
  title: string
  content: string
  summary?: string
  cover?: string
  status: 'draft' | 'published' | 'archived'
  tags: string[]
  categoryId?: number
  authorId: number
  author?: {
    id: number
    username: string
    avatar?: string
  }
  viewCount: number
  likeCount: number
  commentCount: number
  createdAt: string
  updatedAt: string
}

// 文章创建/更新参数
export interface ArticleParams {
  title: string
  content: string
  summary?: string
  cover?: string
  status?: 'draft' | 'published'
  tags?: string[]
  categoryId?: number
}

// 文章列表查询参数
export interface ArticleListParams {
  page?: number
  pageSize?: number
  keyword?: string
  status?: 'draft' | 'published' | 'archived'
  categoryId?: number
  authorId?: number
  tags?: string[]
}

// 分类接口
export interface Category {
  id: number
  name: string
  description?: string
  articleCount: number
  createdAt: string
}

/**
 * 文章 API 服务
 */
export const articleApi = {
  /**
   * 获取文章列表
   */
  getArticleList(params: ArticleListParams): Promise<PaginationResponse<Article>> {
    return request.get<PaginationResponse<Article>>('/articles', { params })
  },

  /**
   * 根据 ID 获取文章详情
   */
  getArticleById(id: number): Promise<Article> {
    return request.get<Article>(`/articles/${id}`)
  },

  /**
   * 创建文章
   */
  createArticle(params: ArticleParams): Promise<Article> {
    return request.post<Article>('/articles', params)
  },

  /**
   * 更新文章
   */
  updateArticle(id: number, params: Partial<ArticleParams>): Promise<Article> {
    return request.put<Article>(`/articles/${id}`, params)
  },

  /**
   * 删除文章
   */
  deleteArticle(id: number): Promise<void> {
    return request.delete<void>(`/articles/${id}`)
  },

  /**
   * 发布文章
   */
  publishArticle(id: number): Promise<Article> {
    return request.patch<Article>(`/articles/${id}/publish`)
  },

  /**
   * 归档文章
   */
  archiveArticle(id: number): Promise<Article> {
    return request.patch<Article>(`/articles/${id}/archive`)
  },

  /**
   * 点赞文章
   */
  likeArticle(id: number): Promise<void> {
    return request.post<void>(`/articles/${id}/like`)
  },

  /**
   * 取消点赞
   */
  unlikeArticle(id: number): Promise<void> {
    return request.delete<void>(`/articles/${id}/like`)
  },

  /**
   * 获取热门文章
   */
  getPopularArticles(limit = 10): Promise<Article[]> {
    return request.get<Article[]>('/articles/popular', { params: { limit } })
  },

  /**
   * 获取推荐文章
   */
  getRecommendedArticles(limit = 10): Promise<Article[]> {
    return request.get<Article[]>('/articles/recommended', { params: { limit } })
  }
}

/**
 * 分类 API 服务
 */
export const categoryApi = {
  /**
   * 获取所有分类
   */
  getAllCategories(): Promise<Category[]> {
    return request.get<Category[]>('/categories')
  },

  /**
   * 根据 ID 获取分类
   */
  getCategoryById(id: number): Promise<Category> {
    return request.get<Category>(`/categories/${id}`)
  },

  /**
   * 创建分类
   */
  createCategory(params: { name: string; description?: string }): Promise<Category> {
    return request.post<Category>('/categories', params)
  },

  /**
   * 更新分类
   */
  updateCategory(id: number, params: { name?: string; description?: string }): Promise<Category> {
    return request.put<Category>(`/categories/${id}`, params)
  },

  /**
   * 删除分类
   */
  deleteCategory(id: number): Promise<void> {
    return request.delete<void>(`/categories/${id}`)
  }
}