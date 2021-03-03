import {
  LOADING,
  DARKMODE
} from '@/store/mutation-types'

const app = {
  namespaced: true,
  state: {
    loading: false,
    darkMode: false,
  },
  mutations: {
    [LOADING]: (state, type) => {
      state.loading = Boolean(type)
    },
    [DARKMODE]: (state, type) => {
      state.darkMode = type || !state.darkMode
    }
  },
  actions: {}
}

export default app
