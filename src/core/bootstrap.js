import Vue from 'vue'
import store from '@/store'

import {
    WIDTH_TYPE,
} from '@/store/mutation-types'
import config from '@/config/defaultSetting'

export default function Initializer () {
    store.commit(WIDTH_TYPE, Vue.ls.get(WIDTH_TYPE, config.widthType))
}
