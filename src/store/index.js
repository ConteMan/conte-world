import Vue from 'vue'
import Vuex from 'vuex'
import { routes,authRoutes } from "@/router"

Vue.use(Vuex)

import user from "@/store/modules/user"

export default new Vuex.Store({
    state: {
        loading: false, //全局加载
        routes: [],
        addRoutes: [],
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
        SET_LOADING: (state, data) => {
            state.loading = data
        },
        SET_ADD_ROUTES: (state,addRoutes) => {
            state.addRoutes = addRoutes
            state.routes = routes.concat(addRoutes)
        },
        SET_ROUTES: (state,routes) => {
            state.routes = routes
        },
    },
    actions: {
        generateRoutes({ commit }) {
            return new Promise(resolve => {
                commit('SET_ADD_ROUTES', authRoutes)
                resolve(authRoutes)
            })
        }
    },
    modules: {
        user
    }
})
