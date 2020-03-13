import Vue from 'vue'
import {
    WIDTH_TYPE,
} from '@/store/mutation-types'

const setting = {
    state: {
        widthType: 1,
    },
    mutations: {
        [WIDTH_TYPE]: (state, type) => {
            state.widthType = type
            Vue.ls.set(WIDTH_TYPE, type)
        },
    },
    actions: {
    }
}

export default setting
