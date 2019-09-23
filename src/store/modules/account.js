// initial state
const state = {
    user: {}
}

// getters
const getters = {}

// actions
const actions = {
}

// mutations
const mutations = {
    setUser (state, user) {
        state.user = user
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}