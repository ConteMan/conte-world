export default {
    namespaced: true,
    state: {
        token: '',
    },
    getters: {
        token: (state) => {
            return state.token
        },
    },
    mutations: {
        setToken (state, token) {
            state.token = token
        },
    }
}
