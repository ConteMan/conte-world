import _ from 'lodash'

const getters = {
  loading: state => state.app.loading,
  darkMode: state => state.app.darkMode,
  menuStatus: state => state.app.menuStatus,
  isMobile: state => state.app.isMobile,
  contentHeight: state => state.app.contentHeight,
  routes: state => {
    const routes = state.permission.routes
    _.remove(routes, (item) => {
      return ['/', '*'].includes(item.path)
    })
    return routes
  },
}

export default getters
