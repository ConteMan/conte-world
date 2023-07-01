type FetchResponse<T> = {
  code: number
  message: string
  data: T
}

interface ListMeta {
  page: number
  per_page: number
  total: number
  has_more: boolean
}

declare namespace Profile {
  type ATarget = '_self' | '_blank' | '_parent' | '_top'
  interface navItem {
    name: string
    link: string
    target: ATarget
  }
  interface socialItem {
    name: string
    link: string
    target: ATarget
    icon: string
  }
  interface RecordInfo {
    num?: string
    policeText?: string
    policeNum?: string
  }
  export interface Data {
    logo: string
    siteName: string
    userName: string
    tag: string
    slogan: string
    nav?: navItem[]
    social?: socialItem[]
    createdAt: string
    recordInfo?: RecordInfo
  }
}

declare namespace Article {
  export interface Item {
    id: number
    slug: string
    title: string
    is_public: number
    status: number
    published_at: string
    info_at: string
    created_at: string
    updated_at: string
  }

  export interface List {
    meta: ListMeta
    items: Item[]
  }

  export type viewItem = Item & {
    content_html: string
  }
}

declare namespace Memo {
  export interface Item {
    id: number
    rouStatus: string
    creatorId: number
    createdTs: number
    updatedTs: number
    content: string
    contentHtml: string
    visibility: string
    pinned: boolean
    creatorName: string
    resourceList: any[]
    relationList: any[]
  }

  export interface List {
    meta: ListMeta
    items: Item[]
  }
}