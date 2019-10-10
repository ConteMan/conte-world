import Vue from 'vue'
import App from '@/views/nav/App.vue'

import router from '@/router/nav'
import axios from 'axios'

import 'ant-design-vue/dist/antd.css'
import Antd from 'ant-design-vue'

Vue.use(Antd)

Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
