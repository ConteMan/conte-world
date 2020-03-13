import Vue from 'vue'
import {
    LOADING,
} from '@/store/mutation-types'

const app = {
    namespaced: true,
    state: {
        loading: false,
    },
    mutations: {
        [LOADING]: (state, type) => {
            state.loading = Boolean(type)
        },
    },
    actions: {
    }
}

export default app
