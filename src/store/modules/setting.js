import Vue from "vue"
import defaultSetting from "@/config/defaultSetting"
import {
    WIDTH_TYPE,
    LAYOUT_VERSION,
} from '@/store/mutation-types'

const setting = {
    state: {
        layoutVersion: defaultSetting.layoutVersion,
        widthType: defaultSetting.widthType,
    },
    mutations: {
        [LAYOUT_VERSION]: (state, version) => {
            state.layoutVersion = version
            Vue.ls.set(LAYOUT_VERSION, version)
        },
        [WIDTH_TYPE]: (state, type) => {
            state.widthType = type
            Vue.ls.set(WIDTH_TYPE, type)
        },
    },
    actions: {
    }
}

export default setting
