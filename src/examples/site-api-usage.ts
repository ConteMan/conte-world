import { getSiteInfo, type SiteInfo } from '@/api/site'

/**
 * 站点 API 使用示例
 */
export class SiteApiExample {
  /**
   * 获取站点信息示例
   */
  static async fetchSiteInfo(): Promise<void> {
    try {
      console.log('🔄 正在获取站点信息...')
      
      const siteInfo: SiteInfo = await getSiteInfo()
      
      console.log('✅ 站点信息获取成功:', {
        nickname: siteInfo.nickname,
        siteName: siteInfo.site_name,
        slogan: siteInfo.slogan,
        intro: siteInfo.intro,
        linksCount: siteInfo.links.length
      })
      
      // 打印所有链接
      console.log('🔗 站点链接:')
      siteInfo.links.forEach((link, index) => {
        console.log(`  ${index + 1}. ${link.name}: ${link.url}`)
      })
      
    } catch (error) {
      console.error('❌ 获取站点信息失败:', error)
    }
  }
  
  /**
   * 处理站点信息的工具方法
   */
  static processSiteInfo(siteInfo: SiteInfo) {
    return {
      // 格式化显示名称
      displayName: `${siteInfo.nickname} - ${siteInfo.site_name}`,
      
      // 获取 GitHub 链接
      githubLink: siteInfo.links.find(link => 
        link.name.toLowerCase().includes('github')
      )?.url,
      
      // 获取即刻链接
      jikeLink: siteInfo.links.find(link => 
        link.name.toLowerCase().includes('jike')
      )?.url,
      
      // 格式化简介
      formattedIntro: `${siteInfo.intro} - ${siteInfo.slogan}`,
      
      // 链接映射
      linkMap: siteInfo.links.reduce((map, link) => {
        map[link.name.toLowerCase()] = link.url
        return map
      }, {} as Record<string, string>)
    }
  }
}

// 使用示例
if (import.meta.env.DEV) {
  // 在开发环境下可以直接调用示例
  // SiteApiExample.fetchSiteInfo()
}