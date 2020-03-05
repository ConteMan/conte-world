import Vue from 'vue'
import App from './App'
import store from '@/store'
import router,{ routes } from '@/router'

import 'normalize.css/normalize.css'

import VueAnalytics from "vue-analytics";
Vue.use(VueAnalytics, {
  id: process.env.VUE_APP_BASE_GA,
  //disableScriptLoader: true,
  router,
  autoTracking: {
    pageviewOnLoad: true
  }
});

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

import { message } from 'ant-design-vue' //消息提示
Vue.prototype.$message = message;
Vue.prototype.$message.config({
  top: '20px',
  duration: 2,
})

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