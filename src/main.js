import Vue from 'vue'
import App from './App'
import store from '@/store'
import router,{ routes } from '@/router'

import 'normalize.css/normalize.css'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd);

import config from '@/config' //全局配置
Vue.prototype.$config = config

import api from '@/api'
Vue.prototype.$api = api

import dayjs from "dayjs"
Vue.prototype.$dayjs = dayjs

import _ from "lodash"
Vue.prototype._ = _

Vue.config.productionTip = false

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

store.commit("SET_ROUTES", routes)