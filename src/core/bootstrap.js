import Vue from 'vue'
import store from '@/store'

import * as MT from '@/store/mutation-types'
import setting from '@/config/setting'

export default function() {
  const menuStatus = Vue.ls.get(setting.storageKeys.menuStatus, setting.menuStatus)
  store.commit('app/' + MT.MENU_STATUS, menuStatus)
}

