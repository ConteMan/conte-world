import Vue from 'vue'
import router, { resetRouter, authRoutes } from '@/router'
import store from './store'
import config from '@/config/defaultSetting'
import { ACCESS_TOKEN, ROUTES } from '@/store/mutation-types'
import { removeToken } from '@/utils/auth'

router.beforeEach(async(to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + ' - ' + config.siteName
  }

  const toName = to.name
  const hasToken = Vue.ls.get(ACCESS_TOKEN)
  const routes = await store.getters.routes

  if (toName == 'Logout' || to.path == '/logout') {
    if (!hasToken) {
      next({ name: config.defaultRouteName })
      return
    } else {
      resetRouter()
      removeToken()
      await store.commit('permission/RESET_ROUTES')
      next({ name: config.defaultRouteName })
      return
    }
  }

  // 登录状态判断
  let refresh = false
  if (hasToken) {
    if (to.name == 'Login') {
      next({ name: 'Mine' })
      return
    } else {
      const storeAccessToken = store.getters.accessToken
      if (!storeAccessToken) { // 刷新登录
        await store.commit('user/' + ACCESS_TOKEN, hasToken)
        await store.commit('permission/' + ROUTES, routes.concat(authRoutes))
        router.addRoutes(authRoutes)
        refresh = true
      }
    }
  }

  // 路由菜单处理，激活状态
  let isMatched = false // 用于判断是否访问不存在路由，即没有权限
  routes.forEach((item, index) => {
    item.active = false
    if (item.name == toName) {
      item.active = true
      isMatched = true
      return
    } else {
      if (item.children) {
        item.children.forEach((cItem, cIndex) => {
          if (cItem.name == toName) {
            item.active = true
            isMatched = true
          }
        })
      } else {
        item.active = false
      }
    }
    if (typeof item.active === 'undefined') item.active = false
  })

  if (!isMatched) {
    next({ name: config.defaultRouteName })
    return
  }

  if (refresh) {
    // 确保路由添加完毕
    next({ ...to, replace: true })
  } else {
    if (to.path) {
      window._hmt.push(['_trackPageview', '/#' + to.fullPath]) // 百度统计
    }
    next()
  }
})
