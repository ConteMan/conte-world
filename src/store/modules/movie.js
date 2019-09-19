
// initial state
const state = {
    websocket: null,
    data: {},
}

// getters
const getters = {}

// actions
const actions = {
}

// mutations
const mutations = {
    setWebsocket (state, websocket) {
        state.websocket = websocket
    },
    setData (state, data) {
        state.data = data
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}