const getters = {
  loading: state => state.app.loading,
  darkMode: state => state.app.darkMode,
  menuStatus: state => state.app.menuStatus,
  routes: state => state.permission.routes,
}

export default getters
