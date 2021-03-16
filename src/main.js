import Vue from 'vue'
import App from './App'
import router from '@/router'
import store from '@/store'

import bootstrap from '@/core/bootstrap'
import '@/core/lazy_use'
import '@/permission'

import 'normalize.css/normalize.css'
import '@/style/markdown.css'
import '@/style/index.less'
import 'animate.css/source/animate.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created() {
    bootstrap()
  },
  render: h => h(App)
}).$mount('#app')
