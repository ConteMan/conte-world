import request from '@/utils/request'

// 站点链接类型
export interface SiteLink {
  name: string
  url: string
}

// 站点信息类型
export interface SiteInfo {
  intro: string
  links: SiteLink[]
  nickname: string
  site_name: string
  slogan: string
}

/**
 * 获取站点信息
 * @returns Promise<SiteInfo> 站点信息
 */
export const getSiteInfo = (): Promise<SiteInfo> => {
  return request.get<SiteInfo>('/site/info')
}