import Vue from 'vue'
import Vuex from 'vuex'
import movie from "./modules/movie"
import setting from "./modules/setting"
import account from "./modules/account"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    movie,
    setting,
    account
  }
})
