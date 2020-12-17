import {
  LOADING,
  DARKMODE
} from '@/store/mutation-types'
import { isBoolean } from 'xe-utils'

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
      state.darkMode = isBoolean(type) ? type : !state.darkMode
    }
  },
  actions: {}
}

export default app
