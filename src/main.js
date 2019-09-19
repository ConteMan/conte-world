import Vue from 'vue'
import App from './App.vue'

import router from './router/router'
import store from './store/store'
import axios from 'axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from "echarts";
import eDark from './assets/css/dark'

import './assets/js/common.js'
import api from './api'

import particlesJS from 'particles.js'

Vue.use(ElementUI)
Vue.use(particlesJS)

Vue.prototype.$eDark = eDark
Vue.prototype.$echarts = echarts
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
