import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loading: false, //全局加载
        routes: [],
    },
    getters: {
        loading: (state) => {
            return state.loading
        },
        routes: (state) => {
            return state.routes
        }
    },
    mutations: {
        setLoading: (state, data) => {
            state.loading = data
        },
        setRoutes: (state, data) => {
            state.routes = data
        }
    },
    modules: {
    }
})
