import Vue from 'vue'
import * as MT from '@/store/mutation-types'
import setting from '@/config/setting'

const app = {
  namespaced: true,
  state: {
    loading: false,
    darkMode: false,
    menuStatus: setting.menuStatus,
    isMobile: window.innerWidth <= 768,
    contentHeight: 0,
  },
  mutations: {
    [MT.LOADING]: (state, type) => {
      state.loading = Boolean(type)
    },
    [MT.DARK_MODE]: (state, type = 'default') => {
      state.darkMode = type === 'default' ? !state.darkMode : Boolean(type)
      state.darkMode ? document.getElementsByTagName('body')[0].className = 'dark-theme' : document.body.removeAttribute('class')
    },
    [MT.MENU_STATUS]: (state, type = 'default') => {
      state.menuStatus = type === 'default' ? !state.menuStatus : Boolean(type)
      Vue.ls.set(setting.storageKeys.menuStatus, state.menuStatus)
    },
    [MT.IS_MOBILE]: (state, type) => {
      state.isMobile = Boolean(type)
    },
    [MT.CONTENT_HEIGHT]: (state, height) => {
      state.contentHeight = height
    }
  },
  actions: {}
}

export default app
