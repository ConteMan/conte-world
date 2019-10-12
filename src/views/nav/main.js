import Vue from 'vue'
import App from '@/views/nav/App.vue'

import router from '@/router/nav'
import store from '@/store/nav'
import axios from 'axios'
import api from '@/api'

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
