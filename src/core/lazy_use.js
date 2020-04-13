import Vue from 'vue'
import router from "@/router"
import VueStorage from 'vue-ls'
import defaultSetting from '@/config/defaultSetting'

//components
import '@/core/lazy_lib/components' //ant design 组件

//config
import config from '@/config/defaultSetting' //全局配置
import api from '@/api'

//extend
import VueAnalytics from "vue-analytics" //谷歌统计
import dayjs from "dayjs" //时间
import _ from "lodash" //工具

import 'xe-utils' //vxe 表格
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'

Vue.use(VueStorage, defaultSetting.storageOptions)
Vue.use(VXETable)

if (process.env.NODE_ENV == 'production') {
    Vue.use(VueAnalytics, {
        id: process.env.VUE_APP_BASE_GA,
        disableScriptLoader: false,
        router,
        autoTracking: {
            pageviewOnLoad: true
        }
    })
}

Vue.prototype.$config = config
Vue.prototype.$api = api
Vue.prototype.$dayjs = dayjs
Vue.prototype._ = _