import Vue from 'vue'
import Vuex from 'vuex'

import app from '@/store/modules/app'
import permission from '@/store/modules/permission'
import article from '@/store/modules/article'

import getters from '@/store/getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    app,
    permission,
    article,
  },
  getters,
})
