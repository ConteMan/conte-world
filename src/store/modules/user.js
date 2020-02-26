export default {
    namespaced: true,
    state: {
        token: '',
        roles: [],
    },
    getters: {
        token: (state) => {
            return state.token
        },
        roles: (state) => {
            return state.roles
        }
    },
    mutations: {
        SET_TOKEN (state, token) {
            state.token = token
        },
        SET_ROLES(state, roles) {
            state.roles = roles
        }
    }
}
