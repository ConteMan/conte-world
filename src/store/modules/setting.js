import Vue from 'vue'
import defaultSetting from '@/config/defaultSetting'
import {
  LAYOUT_VERSION,
  WIDTH_TYPE,
  MENU_ACTION,
  MENU_STATUS,
} from '@/store/mutation-types'
import { isBoolean } from 'xe-utils'

const setting = {
  state: {
    layoutVersion: defaultSetting.layoutVersion,
    widthType: defaultSetting.widthType,
    menuStatus: defaultSetting.menuStatus,
  },
  mutations: {
    [LAYOUT_VERSION]: (state, version) => {
      state.layoutVersion = version
      Vue.ls.set(LAYOUT_VERSION, version)
    },
    [WIDTH_TYPE]: (state, type) => {
      state.widthType = type
      Vue.ls.set(WIDTH_TYPE, type)
    },
    [MENU_ACTION]: (state, status) => {
      state.menuStatus = isBoolean(status) ? status : !state.menuStatus
      Vue.ls.set(MENU_STATUS, state.menuStatus)
    },
  },
  actions: {}
}

export default setting
