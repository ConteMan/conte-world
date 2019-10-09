import Vue from 'vue'
import App from '@/views/botalk/App.vue'

import router from '@/router/botalk'
import store from '@/store/botalk'
import axios from 'axios'

import api from '@/api'
import '@/assets/js/common.js'

import 'ant-design-vue/dist/antd.css'
import Antd from 'ant-design-vue'

Vue.use(Antd)

Vue.prototype.$axios = axios
Vue.prototype.$api = api
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'title is missing'
  next()
})
