const getters = {
    loading: state => state.app.loading,
    accessToken: state => state.user.accessToken,
    routes: state => state.permission.routes,
}

export default getters