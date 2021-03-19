import * as MT from '@/store/mutation-types'

const article = {
  namespaced: true,
  state: {
    showList: true,
  },
  mutations: {
    [MT.ARTICLE_SHOW_LIST]: (state, type) => {
      state.showList = Boolean(type)
    },
  }
}

export default article
