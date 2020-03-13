import Vue from 'vue'
import store from '@/store'
import {
    ACCESS_TOKEN,
} from '@/store/mutation-types'

export function getToken() {
    return Vue.ls.get(ACCESS_TOKEN)
}
export function setToken(token) {
    return Vue.ls.set(ACCESS_TOKEN, token)
}
export function removeToken() {
    store.commit('user/REMOVE_ACCESS_TOKEN')
}