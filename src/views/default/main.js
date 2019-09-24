import Vue from 'vue'
import App from '@/views/default/App.vue'

import router from '@/router/default'
import store from '@/store/default'
import axios from 'axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/assets/js/common.js'
import api from '@/api'

Vue.use(ElementUI)

Vue.prototype.$axios = axios
Vue.prototype.$api = api
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


//路由发生变化修改页面
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'title is missing'
  next()
})
