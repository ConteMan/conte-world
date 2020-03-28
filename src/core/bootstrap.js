import Vue from 'vue'
import store from '@/store'

import {
    LAYOUT_VERSION,
    WIDTH_TYPE,
} from '@/store/mutation-types'
import config from '@/config/defaultSetting'

export default function Initializer () {
    store.commit(LAYOUT_VERSION, Vue.ls.get(LAYOUT_VERSION, config.layoutVersion))
    store.commit(WIDTH_TYPE, Vue.ls.get(WIDTH_TYPE, config.widthType))
}
