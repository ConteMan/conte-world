import Vue from 'vue'
import { routes } from '@/router'
import {
    ROUTES,
} from '@/store/mutation-types'

const permission = {
    namespaced: true,
    state: {
        routes: routes,
    },
    mutations: {
        [ROUTES]: (state, data) => {
            state.routes = data
            Vue.ls.set(ROUTES, data)
        },
        RESET_ROUTES: (state) => {
            state.routes = routes
            Vue.ls.set(ROUTES, routes)
        }
    },
    actions: {
    }
}

export default permission
