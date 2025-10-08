import request from '@/utils/request'

// 影视信息接口
export interface Movie {
  id: string
  slug: string
  title: string
  subtitle: string
  cover_url: string
  year: string
  type: string
  sub_type: string
  genres: Record<string, unknown>
  douban_id: string
  douban_url: string
  status: string
  create_time: string
  update_time: string
}

// 用户影视列表项接口
export interface MovieListItem {
  id: string
  movie_slug: string
  comment: string
  status: string
  is_public: boolean
  create_time: string
  update_time: string
  watch_status: string
  movie: Movie
}

// 分页响应接口
export interface MovieListResponse {
  page: number
  perPage: number
  totalItems: number
  totalPages: number
  items: MovieListItem[]
}

// 请求参数接口
export interface MovieListParams {
  page?: number
  perPage?: number
  status?: string
}

// 默认豆瓣用户 ID
const DEFAULT_DOUBAN_USER_ID = '51883921'

/**
 * 获取用户影视列表
 * @param doubanUserId 豆瓣用户 ID，默认为 51883921
 * @param params 请求参数
 * @returns Promise<MovieListResponse>
 */
export const getMovieList = async (
  doubanUserId: string = DEFAULT_DOUBAN_USER_ID,
  params: MovieListParams = {}
): Promise<MovieListResponse> => {
  const { page = 1, perPage = 20, status } = params
  
  const queryParams = new URLSearchParams({
    page: page.toString(),
    perPage: perPage.toString(),
  })
  
  if (status) {
    queryParams.append('status', status)
  }
  
  return request.get(`/movies/${doubanUserId}?${queryParams.toString()}`)
}

/**
 * 获取影视状态选项
 */
export const getMovieStatusOptions = () => [
  { value: '', label: '全部' },
  { value: '1', label: '想看' },
  { value: '2', label: '看过' },
  { value: '3', label: '在看' },
  { value: '4', label: '搁置' },
  { value: '5', label: '抛弃' },
]