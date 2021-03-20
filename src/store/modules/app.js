import _ from 'lodash'
import Vue from 'vue'
import * as MT from '@/store/mutation-types'
import setting from '@/config/setting'
import { routes } from '@/router'
import CommonApi from '@/api/common'

const app = {
  namespaced: true,
  state: {
    loading: true,
    darkMode: false,
    menuStatus: setting.menuStatus,
    isMobile: window.innerWidth <= 768,
    clientWidth: window.innerWidth,
    headerHeight: setting.headerHeight,
    headerPin: true, // true 固定
    contentHeight: 0,
    info: {}, // 基础信息
  },
  mutations: {
    [MT.LOADING]: (state, type) => {
      state.loading = Boolean(type)
    },
    [MT.DARK_MODE]: (state, type = 'default') => {
      state.darkMode = type === 'default' ? !state.darkMode : Boolean(type)
      state.darkMode ? document.querySelector('body').classList.add('dark-theme') : document.querySelector('body').classList.remove('dark-theme')
    },
    [MT.MENU_STATUS]: (state, type = 'default') => {
      state.menuStatus = type === 'default' ? !state.menuStatus : Boolean(type)
      Vue.ls.set(setting.storageKeys.menuStatus, state.menuStatus)
    },
    [MT.IS_MOBILE]: (state, type) => {
      state.isMobile = Boolean(type)
    },
    [MT.CLIENT_WIDTH]: (state, width) => {
      state.clientWidth = width
    },
    [MT.HEADER_HEIGHT]: (state, height) => {
      if (!state.headerPin) {
        state.headerHeight = height
      }
    },
    [MT.HEADER_PIN]: (state) => {
      state.headerPin = !state.headerPin
    },
    [MT.CONTENT_HEIGHT]: (state, height) => {
      state.contentHeight = height
    },
    [MT.INFO]: (state, payload) => {
      state.info = payload
    }
  },
  actions: {
    async init({ commit }) {
      const res = await CommonApi.base()
      if (res.data.code === 0) {
        const info = res.data.data

        // 更新导航路由
        const nav = info.nav.items
        const navRoutes = []
        for (let i = 0; i < nav.length; i++) {
          const path = nav[i].value
          const routeItem = _.find(routes, (item) => {
            return item.path === path
          })
          if (routeItem) {
            routeItem.extend = nav[i]
            navRoutes.push(routeItem)
          }
        }
        commit('permission/' + [MT.ROUTES], navRoutes, { root: true })

        info.nav.items = nav.filter(item => {
          return item.value !== '/'
        })
        commit(MT.INFO, info)

        commit(MT.LOADING, false)
      }
    }
  }
}

export default app
