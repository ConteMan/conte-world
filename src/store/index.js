import Vue from 'vue'
import Vuex from 'vuex'

import app from '@/store/modules/app'
import setting from '@/store/modules/setting'
import user from '@/store/modules/user'
import permission from '@/store/modules/permission'

import getters from '@/store/getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    app,
    setting,
    permission,
    user,
  },
  getters,
})
