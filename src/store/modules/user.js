import Vue from 'vue'
import {
    ACCESS_TOKEN,
} from '@/store/mutation-types'

const user = {
    namespaced: true,
    state: {
        accessToken: '',
    },
    getters: {
        token: (state) => {
            return state.token
        },
    },
    mutations: {
        [ACCESS_TOKEN] (state, token) {
            state.accessToken = token
            Vue.ls.set(ACCESS_TOKEN, token)
        },
        REMOVE_ACCESS_TOKEN (state) {
            state.accessToken = ''
            Vue.ls.remove(ACCESS_TOKEN)
        }
    }
}

export default user