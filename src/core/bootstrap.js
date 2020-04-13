import Vue from 'vue'
import store from '@/store'

import {
    LAYOUT_VERSION,
    WIDTH_TYPE,
    MENU_ACTION,
    MENU_STATUS,
} from '@/store/mutation-types'
import config from '@/config/defaultSetting'

export default function Initializer () {
    store.commit(LAYOUT_VERSION, Vue.ls.get(LAYOUT_VERSION, config.layoutVersion))
    store.commit(WIDTH_TYPE, Vue.ls.get(WIDTH_TYPE, config.widthType))
    store.commit(MENU_ACTION, Vue.ls.get(MENU_STATUS, config.menuStatus))
}
