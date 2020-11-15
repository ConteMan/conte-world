const getters = {
  loading: state => state.app.loading,
  darkMode: state => state.app.darkMode,
  accessToken: state => state.user.accessToken,
  routes: state => state.permission.routes,
}

export default getters
