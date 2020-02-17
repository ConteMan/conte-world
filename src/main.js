import Vue from 'vue'
import App from './App'
import router from '@/router/index'
import store from '@/store/index'

import config from '@/config' //全局配置
Vue.prototype.$config = config

import api from '@/api'
Vue.prototype.$api = api

Vue.config.productionTip = false

import 'normalize.css'
import '@/style/index.less'

import '@/permission'

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'

Vue.use(VXETable)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
