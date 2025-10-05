// 全局类型定义

// 环境变量类型定义
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_VERSION: string
  readonly VITE_USE_MOCK: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// 通用响应类型
declare namespace API {
  // 基础响应结构
  interface BaseResponse<T = unknown> {
    code: number
    message: string
    data: T
    success: boolean
    timestamp: number
  }

  // 分页参数
  interface PaginationParams {
    page?: number
    pageSize?: number
  }

  // 分页响应
  interface PaginationResponse<T> {
    list: T[]
    total: number
    page: number
    pageSize: number
    totalPages: number
  }

  // 排序参数
  interface SortParams {
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
  }

  // 通用查询参数
  interface QueryParams extends PaginationParams, SortParams {
    keyword?: string
  }

  // 文件上传响应
  interface UploadResponse {
    url: string
    filename: string
    size: number
    type: string
  }

  // 错误响应
  interface ErrorResponse {
    code: number
    message: string
    details?: string
    timestamp: number
  }
}

// 组件 Props 通用类型
declare namespace Component {
  // 基础组件 Props
  interface BaseProps {
    class?: string
    style?: string | Record<string, string>
  }

  // 表单项 Props
  interface FormItemProps extends BaseProps {
    label?: string
    required?: boolean
    disabled?: boolean
    readonly?: boolean
  }

  // 表格列定义
  interface TableColumn<T = unknown> {
    key: string
    title: string
    dataIndex?: keyof T
    width?: number | string
    align?: 'left' | 'center' | 'right'
    fixed?: 'left' | 'right'
    sortable?: boolean
    filterable?: boolean
    render?: (value: unknown, record: T, index: number) => string | VNode
  }
}

// 路由相关类型
declare namespace Router {
  // 路由元信息
  interface RouteMeta {
    title?: string
    icon?: string
    requiresAuth?: boolean
    roles?: string[]
    hidden?: boolean
    keepAlive?: boolean
    breadcrumb?: boolean
  }
}

// 用户相关类型
declare namespace User {
  // 用户角色
  type Role = 'admin' | 'user' | 'guest'

  // 用户状态
  type Status = 'active' | 'inactive' | 'banned'

  // 权限
  interface Permission {
    id: string
    name: string
    resource: string
    action: string
  }
}

// 文章相关类型
declare namespace Article {
  // 文章状态
  type Status = 'draft' | 'published' | 'archived'

  // 文章类型
  type Type = 'post' | 'page' | 'note'
}

// 工具类型
declare namespace Utils {
  // 可选的部分属性
  type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

  // 必需的部分属性
  type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

  // 深度可选
  type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
  }

  // 深度必需
  type DeepRequired<T> = {
    [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P]
  }

  // 值类型
  type ValueOf<T> = T[keyof T]

  // 数组元素类型
  type ArrayElement<T> = T extends readonly (infer U)[] ? U : never
}